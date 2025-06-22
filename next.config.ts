import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["nodemailer"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // ❌ Remove this entire webpack section:
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.plugins = config.plugins || []
  //     const CopyPlugin = require("copy-webpack-plugin")
  //     config.plugins.push(
  //       new CopyPlugin({
  //         patterns: [
  //           {
  //             from: "emailTemplates",
  //             to: "emailTemplates",
  //             noErrorOnMissing: true,
  //           },
  //         ],
  //       }),
  //     )
  //   }
  //   return config
  // },
}

export default nextConfig