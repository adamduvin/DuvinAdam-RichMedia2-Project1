const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const createUser = fs.readFileSync(`${__dirname}/../hosted/create_user.html`);
const chatApp = fs.readFileSync(`${__dirname}/../hosted/chat_app.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const jsBundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);
const createJS = fs.readFileSync(`${__dirname}/createNewUser.js`);
const chatAppJS = fs.readFileSync(`${__dirname}/chatApp.js`);

// Sends back the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Sends back the create user page
const getCreateUser = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(createUser);
  response.end();
};

// Sends back the chat app
const getChatApp = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(chatApp);
  response.end();
};

// Sends CSS
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Sends the bundle
const getBundle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(jsBundle);
  response.end();
};

// Sends user creation JS
const getCreateJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(createJS);
  response.end();
};

// Sends chat app JS
const getChatAppJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(chatAppJS);
  response.end();
};

module.exports = {
  getIndex,
  getCreateUser,
  getChatApp,
  getCSS,
  getBundle,
  getCreateJS,
  getChatAppJS,
};
