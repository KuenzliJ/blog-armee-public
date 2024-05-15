/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
      //Temporary that all images are allowed
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      }
    ],
  },
};

export default nextConfig;
