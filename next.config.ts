import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/doctors/dr-anav-rattan",
        destination: "/doctors/anav-rattan",
        permanent: true,
      },
      {
        source: "/doctors/dr-ganesh-dutt-rattan",
        destination: "/doctors/ganesh-dutt-rattan",
        permanent: true,
      },
      {
        source: "/doctors/dr-ganesh-rattan",
        destination: "/doctors/ganesh-dutt-rattan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
