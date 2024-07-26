require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = {
  env: {
    REACT_APP_GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  },
  output: 'export',
  distDir: 'out',
  // Custom webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Perform customizations to webpack config
    return config;
  },
  // Dev server configuration
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'localhost+3-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'localhost+3.pem')),
    },
    host: '192.168.1.10',
    port: 3000,
  },
};
