const APIURL = "https://api.github.com/users/";

const search = document.getElementById("search");
const form = document.getElementById("form");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username);
    createCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorpage(
        `<p> No Profile with this username: <strong> ${username} </strong>exists </p>`
      );
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(APIURL + username + "/repos");
    addReposToCard(data);
  } catch (err) {
    createErrorpage(
      `<p> No Profile with this username: <strong> ${username} </strong>exists </p>`
    );
  }
}

function createErrorpage(msg) {
  const cardHTML = `
    <div class="card">
    ${msg}
  </div>
    `;
  main.innerHTML = cardHTML;
}

function createCard(user) {
  const cardHTML = `
    <div class="card">
    <div>
      <img
        class="avatar"
        src= "${user.avatar_url}"
        id="avatar"
      />
    </div>
    <div class="user-info">
      <h2 id="name">${user.name}</h2>
      <p>
      ${user.bio}
      </p>
      <ul>
        <li id="followers">${user.followers} <span>Followers</span></li>
        <li id="following">${user.following} <span>Following</span></li>
        <li id="repo">${user.public_repos} <span>Repos</span></li>
      </ul>
      <div id="repos">
      </div>
    </div>
  </div>
    `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
  }
  search.value = "";
});
