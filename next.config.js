require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  },
  output: 'export',
  distDir: 'out',

  // Custom headers for Cross-Origin-Opener-Policy (COOP) and Cross-Origin-Embedder-Policy (COEP)
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // Ensure the same-origin policy is enforced
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp', // Requires cooperation from cross-origin resources
          },
        ],
      },
    ];
  },

  // Custom webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add @svgr/webpack loader to handle SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Perform any other customizations to webpack config
    return config;
  },

  // Dev server configuration
  ...(process.env.NODE_ENV === 'development' && {
    devServer: {
      https: {
        key: fs.readFileSync(path.join(__dirname, 'localhost+3-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'localhost+3.pem')),
      },
      host: '192.168.1.10',
      port: 3000,
    },
  }),
};