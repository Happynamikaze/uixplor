/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Security headers (active during `next dev` and `next start` / Vercel)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  // Block sensitive / dangerous paths → redirect to 404
  async redirects() {
    const blocked = [
      "/phpmyadmin",
      "/.git",
      "/.git/:path*",
      "/config",
      "/config/:path*",
      "/server.js",
      "/env",
      "/.env",
      "/.env.local",
      "/wp-admin",
      "/wp-admin/:path*",
      "/wp-login.php",
      "/xmlrpc.php",
      "/private",
      "/private/:path*",
    ];

    return blocked.map((source) => ({
      source,
      destination: "/404",
      permanent: false,
    }));
  },
};

module.exports = nextConfig;
