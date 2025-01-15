/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cf.bstatic.com',
          },
          {
            protocol:'https',
            hostname:'r-xx.bstatic.com'
          }
        ],
    }
};

export default nextConfig;
