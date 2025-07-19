const HTTP = require('http');
const PORT = 3000;

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    let dice = Math.floor(Math.random() * 6) + 1;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${dice}\n`);
    res.write(`${method} ${path}\n`);
    res.end();
  }

});

SERVER.listen(PORT, () => {
  console.log(`Server listeing on port ${PORT}...`);
});
