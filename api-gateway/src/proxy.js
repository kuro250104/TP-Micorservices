import { createProxyMiddleware } from 'http-proxy-middleware';
import { ROUTES } from './routes.js';

const setupProxies = (app) => {
    ROUTES.forEach((route) => {
        console.log(`[GATEWAY] Mounting proxy for ${route.url} -> ${route.proxy.target}`);

        app.use(
            route.url,
            createProxyMiddleware({
                ...route.proxy,
                onError(err, req, res) {
                    console.error(`[GATEWAY] Proxy error on ${route.url}:`, err.message);
                    if (!res.headersSent) {
                        res.status(502).json({
                            error: 'Bad gateway',
                            details: err.message,
                        });
                    }
                },
            })
        );
    });
};

export { setupProxies };
