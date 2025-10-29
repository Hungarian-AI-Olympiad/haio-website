import { base } from '$app/paths';

export async function GET() {
    const baseUrl = 'https://tehetseg.inf.elte.hu';
    
    const routes = [
        { path: '', priority: '1.0', changefreq: 'daily' },        // Home
        { path: '/molo', priority: '0.9', changefreq: 'weekly' },
        { path: '/haio', priority: '0.9', changefreq: 'weekly' },
        { path: '/contact', priority: '0.7', changefreq: 'monthly' },
        { path: '/adatkezelesi', priority: '0.5', changefreq: 'yearly' },
        { path: '/gyik', priority: '0.8', changefreq: 'monthly' },
        { path: '/2024', priority: '0.6', changefreq: 'yearly' },
        { path: '/2025', priority: '0.8', changefreq: 'monthly' },
        { path: '/hall-of-fame', priority: '0.7', changefreq: 'weekly' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `    <url>
        <loc>${baseUrl}${base}${route.path}</loc>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`).join('\n')}
</urlset>`.trim();

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}
