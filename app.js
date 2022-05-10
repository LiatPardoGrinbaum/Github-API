const input = document.querySelector("#inputUrl");
const button = document.querySelector("#submit");
const cards = document.querySelector(".cards-container");

input.addEventListener("keyup", getData);
button.addEventListener("click", getUser);
//will get data from API url

function getData(e) {
  const user = e.target.value;
  console.log(user);
  if (e.key === "enter") {
    // means I pressed enter
    getUser(e);
  }
}

async function getUser(e) {
  e.preventDefault();
  //need to add input validity conditions!
  let user = input.value;
  const response = await fetch(`https://api.github.com/users/${user}`);
  const data = await response.json();
  createCard(data, user);
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

  card.addEventListener("click", function () {
    window.open(`https://github.com/${user}`, "_blank");
  });
}
