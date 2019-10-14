const parseJSON = (xhr, content) => {
  //parse response (obj will be empty in a 204 updated)
  const obj = JSON.parse(xhr.response);
  
  //if message in response, add to screen
  if(obj.message) {
    console.log('test');
    if(obj.message === 'Switch to app'){
      switchToApp(e);
    }

    const p = document.createElement('p');
    p.textContent = `Message: ${obj.message}`;
    //p.id
    content.appendChild(p);
  }
  
  //if users in response, add to screen
  if(obj.users) {
    const userList = document.createElement('p');
    const users = JSON.stringify(obj.users);
    userList.textContent = users;
    content.appendChild(userList);
  }
};

const handleResponse = (xhr, parseResponses) => {
    const content = document.querySelector("#content");

    switch(xhr.status){
      case 200:
        content.innerHTML = `<b>Success</b>`;
        break;
      case 201:
        content.innerHTML = `<b>Created</b>`;
        break;
      case 204:
        content.innerHTML = `<b>Updated</b>`;
        break;
      case 400:
        content.innerHTML = `<b>Bad Request</b>`;
        break;
      case 404:
        content.innerHTML = `<b>Resource Not Found</b>`;
        break;
      default:
        content.innerHTML = `Error code not implemented by client`;
        break;
    }

    if(parseResponses){
        parseJSON(xhr, content);
    }
  };

  const sendAjax = (e, loginForm) => {
    console.log('test');

    const usernameField = loginForm.querySelector('#usernameField');
    const passwordField = loginForm.querySelector('#passwordField');
    
    const url = loginForm.action + `?username=${usernameField.value}&password=${passwordField.value}`;
    const method = 'get';
    
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    if(method == 'get'){
      
      xhr.onload = () => handleResponse(xhr, true);
      const formData = `username=${usernameField.value}&password=${passwordField.value}`;
      console.log(formData);
      xhr.send(formData);
    }
    else{
      xhr.onload = () => handleResponse(xhr, false);
      xhr.send();
    }
    
    e.preventDefault();
    

    return false;
  };

  const switchToApp = (e) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/chatApp');
    xhr.setRequestHeader("Accept", 'text/html');
    xhr.send();
    
    e.preventDefault();

    return false;
  };

  const sendPost = (e, loginForm) => {
    console.log('test');
    const usernameAction = loginForm.getAttribute('action');
    const usernameMethod = loginForm.getAttribute('method');

    const usernameField = loginForm.querySelector('#usernameField');
    const passwordField = loginForm.querySelector('#passwordField');

    const xhr = new XMLHttpRequest();

    xhr.open(usernameMethod, usernameAction);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr);

    const formData = `username=${usernameField.value}&password=${passwordField.value}`;

    xhr.send(formData);

    e.preventDefault();
    return false;
  };

  const init = () => {
    const loginForm = document.querySelector('#loginForm');
    
    const sendUser = (e) => sendAjax(e, loginForm);

    //userForm.addEventListener('submit', getUsers);
    loginForm.addEventListener('submit', sendUser);
  };

  window.onload = init;
