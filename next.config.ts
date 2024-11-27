/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loremflickr.com"
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com"
            },
            {
                protocol: "https",
                hostname: "github.com"
            },
        ],
    },
};
export default nextConfig;
