'use strict';

var parseJSON = function parseJSON(xhr, content) {
  //parse response (obj will be empty in a 204 updated)
  var obj = JSON.parse(xhr.response);

  //if message in response, add to screen
  if (obj.message) {
    console.log('test');
    if (obj.message === 'Switch to app') {
      switchToApp(e);
    }

    var p = document.createElement('p');
    p.textContent = 'Message: ' + obj.message;
    //p.id
    content.appendChild(p);
  }

  //if users in response, add to screen
  if (obj.users) {
    var userList = document.createElement('p');
    var users = JSON.stringify(obj.users);
    userList.textContent = users;
    content.appendChild(userList);
  }
};

var handleResponse = function handleResponse(xhr, parseResponses) {
  var content = document.querySelector("#content");

  switch (xhr.status) {
    case 200:
      content.innerHTML = '<b>Success</b>';
      break;
    case 201:
      content.innerHTML = '<b>Created</b>';
      break;
    case 204:
      content.innerHTML = '<b>Updated</b>';
      break;
    case 400:
      content.innerHTML = '<b>Bad Request</b>';
      break;
    case 404:
      content.innerHTML = '<b>Resource Not Found</b>';
      break;
    default:
      content.innerHTML = 'Error code not implemented by client';
      break;
  }

  if (parseResponses) {
    parseJSON(xhr, content);
  }
};

var sendAjax = function sendAjax(e, loginForm) {
  console.log('test');

  var usernameField = loginForm.querySelector('#usernameField');
  var passwordField = loginForm.querySelector('#passwordField');

  var url = loginForm.action + ('?username=' + usernameField.value + '&password=' + passwordField.value);
  var method = 'get';

  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  if (method == 'get') {

    xhr.onload = function () {
      return handleResponse(xhr, true);
    };
    var formData = 'username=' + usernameField.value + '&password=' + passwordField.value;
    console.log(formData);
    xhr.send(formData);
  } else {
    xhr.onload = function () {
      return handleResponse(xhr, false);
    };
    xhr.send();
  }

  e.preventDefault();

  return false;
};

var switchToApp = function switchToApp(e) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', '/chatApp');
  xhr.setRequestHeader("Accept", 'text/html');
  xhr.send();

  e.preventDefault();

  return false;
};

var sendPost = function sendPost(e, loginForm) {
  console.log('test');
  var usernameAction = loginForm.getAttribute('action');
  var usernameMethod = loginForm.getAttribute('method');

  var usernameField = loginForm.querySelector('#usernameField');
  var passwordField = loginForm.querySelector('#passwordField');

  var xhr = new XMLHttpRequest();

  xhr.open(usernameMethod, usernameAction);

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  var formData = 'username=' + usernameField.value + '&password=' + passwordField.value;

  xhr.send(formData);

  e.preventDefault();
  return false;
};

var init = function init() {
  var loginForm = document.querySelector('#loginForm');

  var sendUser = function sendUser(e) {
    return sendAjax(e, loginForm);
  };

  //userForm.addEventListener('submit', getUsers);
  loginForm.addEventListener('submit', sendUser);
};

window.onload = init;
