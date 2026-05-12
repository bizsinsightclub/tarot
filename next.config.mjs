/** @type {import('next').NextConfig} */
// For GitHub Pages project sites the app is served under /<repo>.
// Set NEXT_PUBLIC_BASE_PATH=/tarot in the deploy workflow. Locally (dev or
// plain `npm run build`) it stays empty so the app works at root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
