const useDockerHosts = process.env.USE_DOCKER_HOSTS === 'true';

const HOST_USER = useDockerHosts ? 'http://users:5000' : 'http://localhost:5000';
const HOST_RESTAURANT = useDockerHosts ? 'http://restaurants:5001' : 'http://localhost:5001';
const HOST_ORDERS = useDockerHosts ? 'http://orders:5002' : 'http://localhost:5002';

const ROUTES = [
    {
        url: '/users',
        auth: false,
        proxy: {
            target: HOST_USER,
            changeOrigin: true,
            pathRewrite: { '^/users': '' },
        },
    },
    {
        url: '/restaurants',
        auth: false,
        proxy: {
            target: HOST_RESTAURANT,
            changeOrigin: true,
            pathRewrite: { '^/restaurants': '' },
        },
    },
    {
        url: '/orders',
        auth: false,
        proxy: {
            target: HOST_ORDERS,
            changeOrigin: true,
            pathRewrite: { '^/orders': '' },
        },
    },
];

export { ROUTES };
