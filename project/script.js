function handleAuthButtons() {
  if (localStorage.getItem("user")) {
    authButtons.innerHTML = "<p onclick='logout()'>logout</p>";
  } else {
    authButtons.innerHTML = `
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
   
      >
        Login
      </button>  
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Signup
      </button>`;
  }
}

function logout() {
  localStorage.removeItem("user");
  handleAuthButtons();
}

/**
 * @definition - goign to store user credentials in localstorage as key "user"
 * @param {String} username - user's username
 * @param {String} password - user's password
 */
function login(username, password) {
  const attempt = authUsers.find(
    (user) => user.username === username && user.password === password
  );
  if (attempt) {
    // set localstorage here
    localStorage.setItem("user", JSON.stringify(attempt));
    handleAuthButtons();
  } else {
    alert("WRONG CREDENTIALS");
  }
}

loginBtn.addEventListener("click", function () {
  login(recipientUsername.value, recipientPassword.value);
  recipientUsername.value = "";
  recipientPassword.value = "";
});

window.onload = () => {
  handleAuthButtons();
};
