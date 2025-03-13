function handleAuthButtons() {
  if (localStorage.getItem("user")) {
    authButtons.innerHTML = "<p onclick='logout()'>logout</p>";
    contentSection.innerHTML = "<h1>SECRET SOCIETY</h1>";
    callRandomUsers();
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
  contentSection.innerHTML = `
          <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://images.pexels.com/photos/27372369/pexels-photo-27372369/free-photo-of-a-person-holding-a-butterfly-on-their-finger.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://images.pexels.com/photos/27372369/pexels-photo-27372369/free-photo-of-a-person-holding-a-butterfly-on-their-finger.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://images.pexels.com/photos/27372369/pexels-photo-27372369/free-photo-of-a-person-holding-a-butterfly-on-their-finger.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                class="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>`;
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
    // could use document.getElemebyId here but is ok to use camelCased id
    contentSection.innerHTML = "<h1>SECRET SOCIETY</h1>";
    callRandomUsers();
  } else {
    alert("WRONG CREDENTIALS");
  }
}

loginBtn.addEventListener("click", function () {
  login(recipientUsername.value, recipientPassword.value);
  recipientUsername.value = "";
  recipientPassword.value = "";
});

async function callRandomUsers() {
  const div = document.createElement("div");
  const ru = await (await fetch("https://randomuser.me/api?results=30")).json();
  renderRandomUsers(ru.results);
  // div.innerHTML = `<pre>${JSON.stringify(ru, null, 2)}</pre>`;
  // contentSection.appendChild(div);
}

window.onload = () => {
  handleAuthButtons();
};

function renderRandomUsers(data) {
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    console.log("current =", current);
    const currentImage = current.picture.medium;
    const currentName = `${current.name.title} ${current.name.first} ${current.name.last}`;
    const currentLocation = `${current.location.city}, ${current.location.country}`;
    const currentEmail = current.email;
    const currentPhone = current.phone;
    const randomUserCard = RandomUserCard(
      currentImage,
      currentName,
      currentLocation,
      currentEmail,
      currentPhone
    );
    contentSection.innerHTML += randomUserCard;
  }
}

function RandomUserCard(img, name, location, email, phone) {
  return `
    <div class="random-user-card">
      <div>
        <img
          class="profile-pic"
          src="${img}"
        />
      </div>
      <div>
        <p>${name}</p>
        <p>${location}</p>
      </div>
      <div class="action-buttons-container">
        <a href="mailto:${email}"><i class="fa-solid fa-envelope"></i>email</a>
        <a href="tel:${phone}"><i class="fa-solid fa-phone"></i>phone</a>
      </div>
    </div>
  `;
}
