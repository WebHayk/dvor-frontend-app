/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

const nextConfig = withBundleAnalyzer({
    reactStrictMode: false,
    images: {
        disableStaticImages: true,
        domains: ["dev.sun.ru.net"],
        loader: "akamai",
        path: ""
    },
    experimental: {
        outputStandalone: true
    }
})

module.exports = nextConfig;
