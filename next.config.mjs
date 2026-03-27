/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/partners",
        destination: "/collaborate",
        permanent: true
      },
      {
        source: "/impact",
        destination: "/publications",
        permanent: true
      },
      {
        source: "/blog/:slug*",
        destination: "/news/:slug*",
        permanent: true
      },
      {
        source: "/blog",
        destination: "/news",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;
