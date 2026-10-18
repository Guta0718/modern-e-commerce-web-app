
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains: ["api.escuelajs.co"],
    remotePatterns : [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "api.escuelajs.co",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "i.etsystatic.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        pathname: "/**"
      }
    ]

  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
