/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.admin777.pny-trainings.com'],
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
