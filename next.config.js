/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },   // export app as static files
};
export default nextConfig;
