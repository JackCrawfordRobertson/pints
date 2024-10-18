const express = require('express');
const next = require('next');
const fs = require('fs');
const path = require('path');
const https = require('https');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Handle all requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Development mode: HTTPS server
  if (dev) {
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, 'localhost+3-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'localhost+3.pem')),
    };

    https.createServer(httpsOptions, server).listen(3000, 'localhost', (err) => {
      if (err) throw err;
      console.log('> Ready on https://localhost:3000');
    });

  } else {
    // Production mode: HTTP server
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  }
});