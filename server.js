const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const branchName = process.env.GIT_BRANCH || 'main';
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html');

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading index.html');
    } else {
      const modifiedContent = content.replace('{{BRANCH_NAME}}', branchName);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(modifiedContent);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});