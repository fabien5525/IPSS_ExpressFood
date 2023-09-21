/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,
    images: {
        domains: ['localhost','127.0.0.1','127.0.0.1:8000','localhost:8000'],

    },
}

module.exports = nextConfig
