require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  },
  output: 'export',
  distDir: 'out',

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
};