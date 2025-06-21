/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['nodemailer']
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
    webpack: (config, { isServer }) => {
      if (isServer) {
        // Ensure email templates are included in the build
        config.resolve.alias = {
          ...config.resolve.alias,
          '@/emailTemplates': path.resolve(process.cwd(), 'public/emailTemplates'),
        }
      }
      return config
    }
  }
  
  export default nextConfig
  