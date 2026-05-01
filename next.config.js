/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable built-in Image Optimization
  // - Automatically converts to WebP/AVIF on supporting browsers
  // - Resizes to the exact dimensions requested via the `sizes` prop
  // - Serves cached, compressed images from /_next/image
  images: {
    formats: ['image/avif', 'image/webp'],
    // deviceSizes covers the srcset breakpoints generated for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // imageSizes covers the sizes used with the `sizes` prop on fixed-layout images
    imageSizes: [32, 40, 64, 96, 128, 192, 256],
  },
}

module.exports = nextConfig
