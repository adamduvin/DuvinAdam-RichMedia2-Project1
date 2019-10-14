const fs = require('fs');
const htmlHandler = require('./htmlResponses.js');

const users = {};

const respond = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Maybe change this to a GET
const loginUser = (request, response, body) => {
  //console.log(body);
  const responseJSON = {
    //users,
    message: 'Username and password required.',
  };

  //console.log(body);

  if(!body.username || !body.password){
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  if(!users[body.username]){
    responseJSON.message = 'Incorrect username.'
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  if(users[body.username].password != body.password){
    responseJSON.message = 'Incorrect password.'
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  // Make it change to the chat screen with user's username
  responseJSON.message = 'Switch to app';

  /*response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(fs.readFileSync(`${__dirname}/../hosted/chat_app.html`));
  response.end();*/

  return respond(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
  respondMeta(request, response, 200);
};

const addUser = (request, response, body) => {
  //console.log(body);
  const responseJSON = {
    message: 'Username and password are both required.',
  };

  if (!body.username || !body.password) {
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.username]) {
    responseJSON.message = 'A user with that username already exists';
    responseJSON.id = 'usernameTaken';
    return respond(request, response, 400, responseJSON);
  } else {
    users[body.username] = {};
  }

  users[body.username].username = body.username;
  users[body.username].password = body.password;
  users[body.username].permissions = {};

  // Change to app page passing user's account
  if (responseCode === 201) {
    /*responseJSON.message = 'Switch to app';
    return respond(request, response, responseCode, responseJSON);*/
    response.writeHead(responseCode, { 'Content-Type': 'text/html' });
    response.write(fs.readFileSync(`${__dirname}/../hosted/chat_app.html`));
    response.end();
  }

  //console.log(users);

  return respondMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respond(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondMeta(request, response, 404);
};

module.exports = {
  //getUsers,
  loginUser,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
