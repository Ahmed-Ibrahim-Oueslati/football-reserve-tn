/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure the app directory
  distDir: 'dist',
  // Set src directory as the source
  reactStrictMode: true,
};

export default nextConfig;
