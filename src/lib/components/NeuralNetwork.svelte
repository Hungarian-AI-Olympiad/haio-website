<script lang="ts">
	/**
	 * Floating Mini-MLP Networks Visualization
	 * 
	 * Features:
	 * - Multiple small MLP structures floating around
	 * - Sophisticated spring physics with Hooke's Law
	 * - Energy pulses flowing through connections with light trails
	 * - Much darker blue color scheme
	 * - Bouncy, elastic edges between neurons
	 * - Layered architecture (input → hidden → output)
	 */
	import { onMount } from 'svelte';

	export let nodeCount = 8;
	export let position: 'top' | 'corner' | 'full' = 'top';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let animationFrame: number;
	let miniNetworks: MiniNetwork[] = [];
	let pulses: Pulse[] = [];

	// Color palette - Matching site theme (dark-blue and warm-blue)
	const neuronColor = '#1A2B44';        // dark-blue (same as card buttons)
	const activeNeuronColor = '#5B7AA0';  // warm-blue (hover state)
	const connectionColor = '#1F3556';    // desert-600 (darker navy)
	const pulseColor = '#7A9BC8';         // lighter blue for pulse
	const glowColor = '#5B7AA0';          // warm-blue glow

	interface Neuron {
		id: number;
		x: number;
		y: number;
		vx: number;
		vy: number;
		radius: number;
		layer: number;
		activation: number;
		localX: number; // Position relative to network center
		localY: number;
	}

	interface Connection {
		from: Neuron;
		to: Neuron;
		weight: number;
		springConstant: number;
		restLength: number;
	}

	interface MiniNetwork {
		id: number;
		centerX: number;
		centerY: number;
		vx: number;
		vy: number;
		neurons: Neuron[];
		connections: Connection[];
		rotation: number;
		rotationSpeed: number;
		scale: number;
	}

	interface Pulse {
		connection: Connection;
		progress: number;
		speed: number;
		intensity: number;
		network: MiniNetwork;
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		resizeCanvas();
		initNetworks();
		animate();

		window.addEventListener('resize', resizeCanvas);

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	function resizeCanvas() {
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		initNetworks();
	}

	function initNetworks() {
		miniNetworks = [];
		pulses = [];
		
		const width = canvas.width;
		const height = canvas.height;

		// Calculate how many mini-networks to create
		let networkCount: number;
		if (position === 'top') {
			networkCount = Math.floor(nodeCount / 4); // More networks, smaller size
		} else if (position === 'corner') {
			networkCount = 1; // Only one network for card corners
		} else {
			networkCount = Math.floor(nodeCount / 4);
		}
		networkCount = Math.max(networkCount, 1); // At least 1 network

		// Create mini-networks
		for (let i = 0; i < networkCount; i++) {
			const network = createMiniNetwork(i, width, height);
			miniNetworks.push(network);
			
			// Add initial pulses
			if (network.connections.length > 0) {
				for (let j = 0; j < 2; j++) {
					addPulseToNetwork(network);
				}
			}
		}
	}

	function createMiniNetwork(id: number, width: number, height: number): MiniNetwork {
		let centerX: number, centerY: number;
		
		if (position === 'top') {
			centerX = (width / (Math.floor(nodeCount / 6) + 1)) * (id + 1);
			centerY = 35 + Math.random() * 20;
		} else if (position === 'corner') {
			// Single network positioned in the top-right area with some randomization
			centerX = width * 0.7 + Math.random() * width * 0.2;
			centerY = height * 0.2 + Math.random() * height * 0.3;
		} else {
			// Distribute across full area
			if (Math.random() < 0.7) {
				// Prefer sides
				centerX = Math.random() < 0.5 ? 
					Math.random() * width * 0.2 : 
					width * 0.8 + Math.random() * width * 0.2;
			} else {
				centerX = width * 0.3 + Math.random() * width * 0.4;
			}
			centerY = height * 0.2 + Math.random() * height * 0.6;
		}

		const neurons: Neuron[] = [];
		const connections: Connection[] = [];
		
		// Create random MLP structures: vary between 1-6 neurons per layer
		const numLayers = 3; // Input, hidden, output
		const layers = [
			Math.floor(Math.random() * 6) + 1, // Input: 1-6
			Math.floor(Math.random() * 6) + 1, // Hidden: 1-6
			Math.floor(Math.random() * 6) + 1  // Output: 1-6
		];
		const layerSpacing = 25;
		const neuronSpacing = 15;
		
		let neuronId = 0;
		
		// Create neurons in layers
		layers.forEach((layerSize, layerIndex) => {
			const layerX = (layerIndex - 1) * layerSpacing; // Centered around 0
			
			for (let i = 0; i < layerSize; i++) {
				const layerY = (i - (layerSize - 1) / 2) * neuronSpacing;
				
				neurons.push({
					id: neuronId++,
					x: centerX + layerX,
					y: centerY + layerY,
					vx: 0,
					vy: 0,
					radius: 3 + Math.random() * 1.5,
					layer: layerIndex,
					activation: Math.random() * 0.3,
					localX: layerX,
					localY: layerY
				});
			}
		});

		// Create connections between adjacent layers (feed-forward)
		let layerStartIdx = 0;
		for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
			const currentLayerSize = layers[layerIdx];
			const nextLayerSize = layers[layerIdx + 1];
			const nextLayerStartIdx = layerStartIdx + currentLayerSize;
			
			for (let i = 0; i < currentLayerSize; i++) {
				for (let j = 0; j < nextLayerSize; j++) {
					const from = neurons[layerStartIdx + i];
					const to = neurons[nextLayerStartIdx + j];
					
					const dx = to.localX - from.localX;
					const dy = to.localY - from.localY;
					const distance = Math.sqrt(dx * dx + dy * dy);
					
					connections.push({
						from,
						to,
						weight: 0.4 + Math.random() * 0.6,
						springConstant: 0.02 + Math.random() * 0.01,
						restLength: distance
					});
				}
			}
			
			layerStartIdx = nextLayerStartIdx;
		}

		return {
			id,
			centerX,
			centerY,
			vx: (Math.random() - 0.5) * 0.3,
			vy: (Math.random() - 0.5) * 0.3,
			neurons,
			connections,
			rotation: Math.random() * Math.PI * 2,
			rotationSpeed: (Math.random() - 0.5) * 0.002,
			scale: 0.8 + Math.random() * 0.4
		};
	}

	function addPulseToNetwork(network: MiniNetwork) {
		if (network.connections.length === 0) return;
		
		const connection = network.connections[Math.floor(Math.random() * network.connections.length)];
		pulses.push({
			connection,
			progress: 0,
			speed: 0.008 + Math.random() * 0.012,
			intensity: 0.6 + Math.random() * 0.4,
			network
		});
	}

	function animate() {
		if (!ctx || !canvas) return;

		const c = ctx; // TypeScript-safe alias
		c.clearRect(0, 0, canvas.width, canvas.height);

		const width = canvas.width;
		const height = canvas.height;

		// Update mini-networks
		miniNetworks.forEach(network => {
			// Update network position
			network.centerX += network.vx;
			network.centerY += network.vy;
			
			// Update rotation
			network.rotation += network.rotationSpeed;

			// Bounce off boundaries with damping
			const margin = 60;
			if (network.centerX < margin || network.centerX > width - margin) {
				network.vx *= -0.8;
				network.centerX = Math.max(margin, Math.min(width - margin, network.centerX));
			}
			if (network.centerY < margin || network.centerY > height - margin) {
				network.vy *= -0.8;
				network.centerY = Math.max(margin, Math.min(height - margin, network.centerY));
			}

			// Apply spring forces between neurons
			network.connections.forEach(conn => {
				const dx = conn.to.x - conn.from.x;
				const dy = conn.to.y - conn.from.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance > 0) {
					// Hooke's Law: F = -k * (x - rest_length)
					const displacement = distance - conn.restLength * network.scale;
					const force = displacement * conn.springConstant;
					
					const fx = (dx / distance) * force;
					const fy = (dy / distance) * force;
					
					// Apply force to both neurons (equal and opposite)
					conn.from.vx += fx * 0.5;
					conn.from.vy += fy * 0.5;
					conn.to.vx -= fx * 0.5;
					conn.to.vy -= fy * 0.5;
				}
			});

			// Update neuron positions with damping
			network.neurons.forEach(neuron => {
				// Apply velocity
				neuron.x += neuron.vx;
				neuron.y += neuron.vy;
				
				// Apply damping (springy but stable)
				neuron.vx *= 0.85;
				neuron.vy *= 0.85;
				
				// Pull neurons back towards their local positions
				const targetX = network.centerX + 
					Math.cos(network.rotation) * neuron.localX * network.scale - 
					Math.sin(network.rotation) * neuron.localY * network.scale;
				const targetY = network.centerY + 
					Math.sin(network.rotation) * neuron.localX * network.scale + 
					Math.cos(network.rotation) * neuron.localY * network.scale;
				
				neuron.vx += (targetX - neuron.x) * 0.05;
				neuron.vy += (targetY - neuron.y) * 0.05;
				
				// Update activation (pulsing effect)
				neuron.activation = Math.max(0, neuron.activation - 0.02);
			});
		});

		// Draw connections first (behind neurons)
		miniNetworks.forEach(network => {
			network.connections.forEach(conn => {
				const dx = conn.to.x - conn.from.x;
				const dy = conn.to.y - conn.from.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				// Draw connection as a curve
				const midX = (conn.from.x + conn.to.x) / 2;
				const midY = (conn.from.y + conn.to.y) / 2;
				
				// Add slight curvature based on spring tension
				const tension = Math.abs(distance - conn.restLength * network.scale) / 10;
				const perpX = -dy / distance;
				const perpY = dx / distance;
				const controlX = midX + perpX * tension * 2;
				const controlY = midY + perpY * tension * 2;

				// Base connection - cool and visible
				c.globalAlpha = 0.6 * conn.weight;
				c.strokeStyle = connectionColor;
				c.lineWidth = 2 * conn.weight * network.scale;
				c.beginPath();
				c.moveTo(conn.from.x, conn.from.y);
				c.quadraticCurveTo(controlX, controlY, conn.to.x, conn.to.y);
				c.stroke();
			});
		});

		// Update and draw pulses
		pulses = pulses.filter(pulse => {
			pulse.progress += pulse.speed;
			
			if (pulse.progress > 1) {
				// Activate target neuron
				pulse.connection.to.activation = Math.min(1, pulse.connection.to.activation + 0.5);
				
				// Spawn new pulse occasionally
				if (Math.random() < 0.5) {
					addPulseToNetwork(pulse.network);
				}
				
				return false;
			}

			// Calculate position along curved path
			const t = pulse.progress;
			const conn = pulse.connection;
			const dx = conn.to.x - conn.from.x;
			const dy = conn.to.y - conn.from.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			
			const midX = (conn.from.x + conn.to.x) / 2;
			const midY = (conn.from.y + conn.to.y) / 2;
			const tension = Math.abs(distance - conn.restLength * pulse.network.scale) / 10;
			const perpX = -dy / distance;
			const perpY = dx / distance;
			const controlX = midX + perpX * tension * 2;
			const controlY = midY + perpY * tension * 2;

			// Quadratic Bezier curve
			const x = Math.pow(1-t, 2) * conn.from.x + 2 * (1-t) * t * controlX + Math.pow(t, 2) * conn.to.x;
			const y = Math.pow(1-t, 2) * conn.from.y + 2 * (1-t) * t * controlY + Math.pow(t, 2) * conn.to.y;

			// Draw light trail
			const trailLength = 5;
			for (let i = 0; i < trailLength; i++) {
				const trailT = Math.max(0, t - (i * 0.02));
				const trailX = Math.pow(1-trailT, 2) * conn.from.x + 2 * (1-trailT) * trailT * controlX + Math.pow(trailT, 2) * conn.to.x;
				const trailY = Math.pow(1-trailT, 2) * conn.from.y + 2 * (1-trailT) * trailT * controlY + Math.pow(trailT, 2) * conn.to.y;
				
				const trailAlpha = (1 - i / trailLength) * pulse.intensity * 0.4;
				const trailSize = (1 - i / trailLength) * 4;
				
				const gradient = c.createRadialGradient(trailX, trailY, 0, trailX, trailY, trailSize);
				gradient.addColorStop(0, pulseColor + 'FF');
				gradient.addColorStop(1, pulseColor + '00');
				
				c.globalAlpha = trailAlpha;
				c.fillStyle = gradient;
				c.beginPath();
				c.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
				c.fill();
			}

			// Draw main pulse with enhanced glow
			const gradient = c.createRadialGradient(x, y, 0, x, y, 8);
			gradient.addColorStop(0, '#FFFFFF');
			gradient.addColorStop(0.2, pulseColor + 'FF');
			gradient.addColorStop(1, pulseColor + '00');
			
			c.globalAlpha = pulse.intensity;
			c.fillStyle = gradient;
			c.beginPath();
			c.arc(x, y, 8, 0, Math.PI * 2);
			c.fill();

			// Bright core
			c.globalAlpha = pulse.intensity;
			c.fillStyle = '#FFFFFF';
			c.beginPath();
			c.arc(x, y, 1.5, 0, Math.PI * 2);
			c.fill();

			return true;
		});

		// Spawn new pulses
		if (Math.random() < 0.03) {
			const randomNetwork = miniNetworks[Math.floor(Math.random() * miniNetworks.length)];
			addPulseToNetwork(randomNetwork);
		}

		// Draw neurons
		miniNetworks.forEach(network => {
			network.neurons.forEach(neuron => {
				const isActive = neuron.activation > 0.3;
				const color = isActive ? activeNeuronColor : neuronColor;
				const size = neuron.radius * network.scale;
				
				// Calculate fade at boundaries to prevent cut-off
				const margin = 50;
				let boundaryFade = 1.0;
				
				// Fade out near edges
				if (neuron.x < margin) {
					boundaryFade = Math.min(boundaryFade, neuron.x / margin);
				} else if (neuron.x > width - margin) {
					boundaryFade = Math.min(boundaryFade, (width - neuron.x) / margin);
				}
				
				if (neuron.y < margin) {
					boundaryFade = Math.min(boundaryFade, neuron.y / margin);
				} else if (neuron.y > height - margin) {
					boundaryFade = Math.min(boundaryFade, (height - neuron.y) / margin);
				}
				
				boundaryFade = Math.max(0, boundaryFade); // Clamp to 0-1
				
				// Outer glow
				if (neuron.activation > 0.1) {
					const glowSize = size * (2 + neuron.activation * 2);
					const gradient = c.createRadialGradient(
						neuron.x, neuron.y, 0,
						neuron.x, neuron.y, glowSize
					);
					gradient.addColorStop(0, glowColor + 'AA');
					gradient.addColorStop(0.5, glowColor + '33');
					gradient.addColorStop(1, glowColor + '00');
					
					c.globalAlpha = neuron.activation * 0.5 * boundaryFade;
					c.fillStyle = gradient;
					c.beginPath();
					c.arc(neuron.x, neuron.y, glowSize, 0, Math.PI * 2);
					c.fill();
				}

				// Main neuron body - more visible with boundary fade
				c.globalAlpha = 1.0 * boundaryFade;
				c.fillStyle = color;
				c.beginPath();
				c.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
				c.fill();

				// Inner highlight - brighter with boundary fade
				c.globalAlpha = 0.7 * boundaryFade;
				c.fillStyle = 'rgba(255, 255, 255, 0.8)';
				c.beginPath();
				c.arc(
					neuron.x - size * 0.3,
					neuron.y - size * 0.3,
					size * 0.35,
					0,
					Math.PI * 2
				);
				c.fill();

				// Active rim
				if (isActive) {
					c.globalAlpha = neuron.activation * 0.8 * boundaryFade;
					c.strokeStyle = pulseColor;
					c.lineWidth = 1.5;
					c.beginPath();
					c.arc(neuron.x, neuron.y, size + 1, 0, Math.PI * 2);
					c.stroke();
				}
			});
		});

		c.globalAlpha = 1;
		animationFrame = requestAnimationFrame(animate);
	}
</script>

<canvas
	bind:this={canvas}
	class="neural-network-canvas"
></canvas>

<style>
	.neural-network-canvas {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}
</style>
