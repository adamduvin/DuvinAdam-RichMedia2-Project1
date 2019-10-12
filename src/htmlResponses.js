const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const createUser = fs.readFileSync(`${__dirname}/../hosted/create_user.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const jsBundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCreateUser = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(createUser);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getBundle = (request, response) => {
  response.writeHead(200, {'Content-Type': 'application/javascript'});
  response.write(jsBundle);
  response.end();
};

module.exports = {
  getIndex,
  getCreateUser,
  getCSS,
  getBundle,
}
