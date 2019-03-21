/* eslint-disable no-console */
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // if (req.url === '/') {
  //   fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
  //     if (err) throw err;
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(content);
  //   });
  // } else if (req.url === '/about') {
  //   fs.readFile(path.join(__dirname, 'about.html'), (err, content) => {
  //     if (err) throw err;
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(content);
  //   });
  // } else if (req.url === '/api/users') {
  //   const users = [
  //     { name: 'Bob Smith', age: 35 },
  //     { name: 'John Doe', age: 25 },
  //   ];
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify(users));
  // }

  // Build file path
  let filePath = path.join(
    __dirname,
    'first_server',
    req.url === '/' ? 'index.html' : req.url
  );

  // Extension of file
  const extName = path.extname(filePath);

  // Initial Content Type
  let contentType;

  // Check extension and set content type
  switch (extName) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.svg':
      contentType = 'image/svg';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (extName === '') filePath += '.html';

  // Log the filePath
  console.log(filePath);

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not Found
        fs.readFile(
          path.join(__dirname, 'first_server', '404.html'),
          // eslint-disable-next-line no-shadow
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
          }
        );
      } else {
        // Some Server Error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server's running on http://localhost:${PORT}`)
);
