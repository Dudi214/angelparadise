/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // opcional (pra acessar do celular)
  allowedDevOrigins: ["192.168.101.4"],
};

module.exports = nextConfig;