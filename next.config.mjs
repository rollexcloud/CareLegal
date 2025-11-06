/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb'
        }
    },
    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com', 'images.pexels.com', 'firebasestorage.googleapis.com', 'websitedemos.net']
    }
};

export default nextConfig;
