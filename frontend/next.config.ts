import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  domains: ['images.unsplash.com']
}
 } 

 module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Change "*" to specific frontend domain for security
          },
        ],
      },
    ];
  },
};


export default nextConfig;
