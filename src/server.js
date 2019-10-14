const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const contentHandler = require('./contentResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/createNewUser': htmlHandler.getCreateUser,
    '/chatApp': htmlHandler.getChatApp,
    '/style.css': htmlHandler.getCSS,
    '/bundle.js': htmlHandler.getBundle,
    '/src/createNewUser.js': htmlHandler.getCreateJS,
    '/src/chatApp.js': htmlHandler.getChatAppJS,
    '/loginUser': contentHandler.loginUser,
    '/notReal': contentHandler.notFound,
    '/success': contentHandler.success,
    '/badRequest': contentHandler.badRequest,
    notFound: contentHandler.notFound,
  },
  HEAD: {
    '/getUsers': contentHandler.getUsersMeta,
    '/notReal': contentHandler.notFoundMeta,
    notFound: contentHandler.notFoundMeta,
  },
  POST: {
    '/addUser': contentHandler.addUser,
  },
};

const handleGet = (request, response, parsedUrl) => {
  if (urlStruct[request.method][parsedUrl.pathname]) {
    // Probably should make a method for this
    //console.log(parsedUrl);
    if(parsedUrl.pathname === '/loginUser'){
      const res = response;
      const body = [];

      request.on('error', (err) => {
        console.dir(err);
        res.statusCode = 400;
        res.end();
      });

      request.on('data', (chunk) => {
        body.push(chunk);
        console.log(body);
      });

      request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(parsedUrl.query);
        console.log(bodyParams);
        contentHandler.loginUser(request, res, bodyParams);
      });
    }
    else{
      urlStruct[request.method][parsedUrl.pathname](request, response);
    }
    
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/loginUser' || parsedUrl.pathname === '/addUser') {
    const res = response;
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      //console.log(parsedUrl);
      // change to login
      if(parsedUrl.pathname === '/loginUser'){
        contentHandler.loginUser(request, res, bodyParams);
      }
      else if(parsedUrl.pathname === '/addUser'){
        contentHandler.addUser(request, res, bodyParams);
      }
    });
  }
};

const onRequest = (request, response) => {
  //console.log(request.url);
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
