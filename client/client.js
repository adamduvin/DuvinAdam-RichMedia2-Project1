// Parses the returned JSON and appends elements to the page or changes to the app
const parseJSON = (xhr, content) => {
  //parse response (obj will be empty in a 204 updated)
  const obj = JSON.parse(xhr.response);
  
  //if message in response, add to screen
  if(obj.message) {
    if(obj.message === 'Switch to app'){
      console.log('test');
      switchToApp(obj.username);
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

// Called when something is returned and appends messages to the page based on result and sometimes calls parseJSON
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

  //Sends get requests
  const sendAjax = (e, loginForm) => {
    //console.log('test');

    const usernameField = loginForm.querySelector('#usernameField');
    const passwordField = loginForm.querySelector('#passwordField');
    
    const url = loginForm.action + `?username=${usernameField.value}&password=${passwordField.value}`;
    console.log(loginForm.action);
    const method = 'get';
    
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    if(method == 'get'){
      
      xhr.onload = () => handleResponse(xhr, true);
      const formData = `username=${usernameField.value}&password=${passwordField.value}`;
      //console.log(formData);
      xhr.send(formData);
    }
    else{
      xhr.onload = () => handleResponse(xhr, false);
      xhr.send();
    }
    
    e.preventDefault();
    

    return false;
  };

  // Changes to the actual chat app
  const switchToApp = (username) => {
    const xhr = new XMLHttpRequest();
    const url = `/../hosted/chat_app.html?username=${username}`;
    xhr.open('get', url);
    xhr.setRequestHeader("Accept", 'text/html');
    xhr.send();
    
    //e.preventDefault();

    //return false;
  };

  // Sends post requests
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

  // Adds a get request to the login button
  const init = () => {
    const loginForm = document.querySelector('#loginForm');
    
    const sendUser = (e) => sendAjax(e, loginForm);

    //userForm.addEventListener('submit', getUsers);
    loginForm.addEventListener('submit', sendUser);
  };

  window.onload = init;
