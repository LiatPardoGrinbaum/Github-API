const input = document.querySelector("#inputUrl");
const button = document.querySelector("#submit");
const cards = document.querySelector(".cards-container");
// const container = document.querySelector(".container");

const error = document.querySelector(".error");

window.addEventListener("load", function () {
  input.focus();
});

input.addEventListener("keyup", getData);
button.addEventListener("click", getUser);
//will get data from API url

function getData(e) {
  // const user = e.target.value;
  // console.log(user);
  if (e.key === "enter") {
    // means I pressed enter
    getUser(e);
  }
}

async function getUser(e) {
  try {
    error.style.display = "none";
    e.preventDefault();
    //need to add input validity conditions!
    let user = input.value;
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    if (!response.ok) {
      throw Error("There isn't such a user name. Please enter a valid user name.");
    } //or :  if (data.message === "Not Found") throw Error("page not found");
    if (cards.innerHTML.includes(data.name)) {
      throw Error("You have already typed that user name.");
    }
    createCard(data, user);
  } catch (err) {
    input.value = "";
    error.style.display = "block";
    error.textContent = `${err}
    `;
  }
}

function createCard(data, user) {
  const card = document.createElement("div");
  const avatar = document.createElement("div");
  const userName = document.createElement("div");
  const repoNumber = document.createElement("div");
  const img = document.createElement("img");
  cards.appendChild(card);
  card.appendChild(avatar);
  card.appendChild(userName);
  card.appendChild(repoNumber);
  avatar.appendChild(img);

  card.classList.add("card");
  userName.classList.add("nameOfUser");
  repoNumber.classList.add("numberPublicRepo");
  card.style.display = "block";
  img.src = data.avatar_url;
  img.style.height = "150px";
  userName.innerHTML = data.name;
  repoNumber.innerHTML = `${data.public_repos} public repositories`;
  input.value = "";
  input.focus();
  card.addEventListener("click", function () {
    window.open(`https://github.com/${user}`, "_blank");
  });
}
