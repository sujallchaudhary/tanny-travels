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
          },
          {
          protocol: 'https',
          hostname:'oaidalleapiprodscus.blob.core.windows.net',
          }
        ],
    }
};

export default nextConfig;
