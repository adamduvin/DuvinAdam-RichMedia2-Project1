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

const loginUser = (request, response, body) => {
  const responseJSON = {
    //users,
    message: 'Username and password required.',
  };

  if(!body.username || !body.password){
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  if(!users[body.username]){
    responseJSON.message = 'Incorrect username.'
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  if(!users[body.password]){
    responseJSON.message = 'Incorrect password.'
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  // Make it change to the chat screen with user's username

  return respond(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
  respondMeta(request, response, 200);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respond(request, response, responseCode, responseJSON);
  }

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
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
