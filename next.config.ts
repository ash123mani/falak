import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  output: 'export',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  images: {
    unoptimized: true,
  },
}

export default nextConfig
