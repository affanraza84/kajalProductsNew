// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//  images:{
//   domains: ['images.unsplash.com']
// },
// reactStrictMode:true,
//  } 

//  module.exports = {
//   async headers() {
//     return [
//       {
//         source: "/api/:path*",
//         headers: [
//           {
//             key: "Access-Control-Allow-Origin",
//             value: "*", // Change "*" to specific frontend domain for security
//           },
//         ],
//       },
//     ];
//   },
// };


// export default nextConfig;



const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
