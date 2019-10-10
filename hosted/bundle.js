'use strict';

var parseJSON = function parseJSON(xhr, content) {
    //parse response (obj will be empty in a 204 updated)
    var obj = JSON.parse(xhr.response);
    console.dir(obj);

    //if message in response, add to screen
    if (obj.message) {
        var p = document.createElement('p');
        p.textContent = 'Message: ' + obj.message;
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

var sendAjax = function sendAjax(e, userForm) {
    var url = userForm.querySelector('#urlField').value;
    console.dir(url);
    var method = userForm.querySelector('#methodSelect').value;

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", 'application/json');
    if (method == 'get') {
        xhr.onload = function () {
            return handleResponse(xhr, true);
        };
    } else {
        xhr.onload = function () {
            return handleResponse(xhr, false);
        };
    }

    xhr.send();

    e.preventDefault();

    return false;
};

var sendPost = function sendPost(e, nameForm) {
    var nameAction = nameForm.getAttribute('action');
    var nameMethod = nameForm.getAttribute('method');

    var nameField = nameForm.querySelector('#nameField');
    var ageField = nameForm.querySelector('#ageField');

    var xhr = new XMLHttpRequest();

    xhr.open(nameMethod, nameAction);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    var formData = 'name=' + nameField.value + '&age=' + ageField.value;

    xhr.send(formData);

    e.preventDefault();
    return false;
};

var init = function init() {
    var nameForm = document.querySelector('#nameForm');
    var userForm = document.querySelector('#userForm');

    var getUsers = function getUsers(e) {
        return sendAjax(e, userForm);
    };
    var addUser = function addUser(e) {
        return sendPost(e, nameForm);
    };

    userForm.addEventListener('submit', getUsers);
    nameForm.addEventListener('submit', addUser);
    console.dir('test');
};

window.onload = init;
