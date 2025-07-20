const HTTP = require('http');
const PORT = 3000;
const URL = require('url').URL;

function dieRoll(min, max) {
  max = !max ? 6 : max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getParams(path) {
  let myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.searchParams;
}

function rollDice(params) {
  let rolls = +params.get('rolls');
  let sides = +params.get('sides');
  let body = '';

  do {
    body += `${dieRoll(1, sides)}\n`;
    rolls -= 1;
  } while(rolls > 0);

  return body;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;
  
  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    let content = rollDice(getParams(path));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(content);
    res.write(`${method} ${path}\n`);
    res.end();
  }

});

SERVER.listen(PORT, () => {
  console.log(`Server listeing on port ${PORT}...`);
});
