/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // static export: deploys to Vercel AND GitHub Pages
  images: { unoptimized: true },
  trailingSlash: true,
}
export default nextConfig
