import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { WEB3FORMS_ACCESS_KEY } from '$env/static/private';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour per IP

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const record = rateLimitMap.get(ip);

	if (!record || now > record.resetTime) {
		rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
		return true;
	}

	if (record.count >= MAX_REQUESTS) {
		return false;
	}

	record.count++;
	return true;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		// Rate limiting
		const clientIp = getClientAddress();
		if (!checkRateLimit(clientIp)) {
			return json(
				{ success: false, error: 'Too many requests. Please try again later.' },
				{ status: 429 }
			);
		}

		const data = await request.json();
		const { name, email, subject, message, honeypot } = data;
		const captchaToken = data['h-captcha-response'];

		// Bot detection: honeypot field should be empty
		if (honeypot) {
			return json(
				{ success: false, error: 'Invalid submission' },
				{ status: 400 }
			);
		}

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return json(
				{ success: false, error: 'All fields are required' },
				{ status: 400 }
			);
		}

		// Validate captcha token
		if (!captchaToken) {
			return json(
				{ success: false, error: 'Please complete the captcha' },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json(
				{ success: false, error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Sanitize inputs (remove HTML tags, trim whitespace)
		const sanitize = (str: string) => str.replace(/<[^>]*>/g, '').trim();
		const sanitizedName = sanitize(name);
		const sanitizedEmail = sanitize(email);
		const sanitizedSubject = sanitize(subject);
		const sanitizedMessage = sanitize(message);

		// Validate sanitized data isn't empty
		if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) {
			return json(
				{ success: false, error: 'Invalid input detected' },
				{ status: 400 }
			);
		}

		// Using Web3Forms - Free, reliable email service (no verification needed!)
		// Get your free access key at: https://web3forms.com
		// Just enter your email and you'll get the key instantly
		
		const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				access_key: WEB3FORMS_ACCESS_KEY,
				name: sanitizedName,
				email: sanitizedEmail, // Sender's email (person who filled the form)
				subject: sanitizedSubject,
				message: sanitizedMessage,
				from_name: 'HAIO Kapcsolat Űrlap',
				replyto: email, // Reply-to will be the sender's email
				'h-captcha-response': captchaToken
				// Note: Your receiving email (mi_olimpia@inf.elte.hu) is configured 
				// in your Web3Forms account under this access key
			})
		});

		const result = await web3FormsResponse.json();
		
		if (!web3FormsResponse.ok || !result.success) {
			console.error('Web3Forms error:', result);
			throw new Error(result.message || 'Failed to send email');
		}

		return json({
			success: true,
			message: 'Email sent successfully'
		});

	} catch (error) {
		// Log errors in development only
		if (import.meta.env.DEV) {
			console.error('Error sending email:', error);
		}
		return json(
			{ success: false, error: 'Failed to send email. Please try again later.' },
			{ status: 500 }
		);
	}
};
