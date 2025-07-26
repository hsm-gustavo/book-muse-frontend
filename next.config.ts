import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "bookmusecdn.hsm-gustavo.dev",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
}

export default nextConfig
