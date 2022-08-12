// Elements that will undergo actions on the page
const button = document.getElementById('searchUser');
const handleUserImage= document.getElementById('userImage');
const handleUserName = document.getElementById('userName');
const handleUserBio = document.getElementById('userBio');
const handleUserFollowers = document.getElementById('userFollowers');
const handleUserFollowings = document.getElementById('userFollowing');
const handleUserRepos = document.getElementById('userRepos');
const handleUserLocation = document.getElementById('userLocation');
const inputUserName = document.getElementById('enterUserName');
const clearInput = document.getElementById('clearInputUsername');
const btnClose = document.getElementById('close');
const modalError = document.querySelector('.error');
const modalBackground = document.getElementById('modalBackground');

// EventListener that fetches users in the Github API
button.addEventListener('click', () => searchUser(inputUserName.value));

// EventListener that execute the function searchUser if the key press is Enter
document.addEventListener('keypress', (e) => {
  if(e.keyCode == 13) searchUser(inputUserName.value);
});

// Function that clear the inputUserName
clearInput.addEventListener('click', () => inputUserName.value = "");

// EventListener that close the error modal when click the button
btnClose.addEventListener('click', function closeModalError() {
  modalError.style.display = 'none';
  modalBackground.style.display = 'none';
});

handleUserImage.addEventListener('click', () => { 
  if (inputUserName.value === "") return;
  else window.open(`https://github.com/${inputUserName.value}`);
})

// Function that fetches users in the Github API
async function searchUser(user) {
  if (inputUserName.value == "") {
    return handleUserName.innerHTML = `<p style="color: red;">Please, enter username.</p>`;
  };
  const urlRequest = await fetch(`https://api.github.com/users/${user}`);
  if (!urlRequest.ok) {
    console.error(`Falha na requisição`);
    console.error(`${urlRequest.status}`);
  } else {
    console.log(
      `%cSucesso!`,
      "color: lime;",
      `Usuário ${user} foi localizado em https://api.github.com/users/${user}.`
    );
  };
  if (urlRequest.status === 404) {
    return styleModalError();
  };
  const data = await urlRequest.json();
  showProfile(data);
};

function showProfile(user) {
  handleUserImage.src = user.avatar_url;
  handleUserName.innerHTML = user.name;
  handleUserBio.innerHTML = user.bio;
  handleUserFollowers.innerHTML = `Followers: ${user.followers}`;
  handleUserFollowings.innerHTML = `Following: ${user.following}`;
  handleUserRepos.innerHTML = `Repositories: ${user.public_repos}`;
  handleUserLocation.innerHTML = `Location: ${user.location}`;
};

// Funcion that open the error modal and write in console the error 404
function styleModalError() {
  modalError.style.display = 'block';
  modalBackground.style.display = 'block';
  console.error("Error 404 User not found");
};