const HTTP = require('http');
const PORT = 3000;
const URL = require('url').URL;
function rollDice(min, max) {
  max = !max ? 6 : max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;
  let myURL = new URL(path, 'http://localhost');
  let rolls = +myURL.searchParams.get('rolls');
  let sides = +myURL.searchParams.get('sides');

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    do {
      let dice = rollDice(1, Number(sides));
      res.write(`${dice}\n`);
      rolls -= 1;
    } while (rolls > 0);

    res.write(`${method} ${path}\n`);
    res.end();
  }

});

SERVER.listen(PORT, () => {
  console.log(`Server listeing on port ${PORT}...`);
});
