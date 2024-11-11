/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['mui-color-input'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
                port: '',
                pathname: '/**/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4200',
                pathname: '/images/**/**',
            },
        ],
    },
}

export default nextConfig
