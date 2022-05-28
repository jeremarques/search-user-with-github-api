// Elements that will undergo actions on the page

const button = document.getElementById('searchUser')
const handleUserImage= document.getElementById('userImage')
const handleUserName = document.getElementById('userName')
const handleUserBio = document.getElementById('userBio')
const handleUserFollowers = document.getElementById('userFollowers')
const handleUserFollowings = document.getElementById('userFollowing')
const handleUserRepos = document.getElementById('userRepos')
const handleUserLocation = document.getElementById('userLocation')
const inputUserName = document.getElementById('enterUserName')
const clearInput = document.getElementById('clearInputUsername')
const btnClose = document.getElementById('close')
const modalError = document.querySelector('.error')
const modalBackground = document.getElementById('modalBackground')


handleUserImage.addEventListener('click', () => { 
  if (inputUserName.value === "") {
    return
  }
  window.open(`https://github.com/${inputUserName.value}`)
})

// EventListener that fetches users in the Github API

button.addEventListener('click', searchUser)

// Function that fetches users in the Github API

async function searchUser() {
  let user = inputUserName.value
  if (user === "") {
    handleUserName.innerHTML = `<p style="color: red;">Please, enter username.</p>`
    return
  }
  try {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const data = await response.json()
    if (!response.ok) {
       console.error("Falha na requisição")
    } else {
      console.log(
        `%cSucesso!`,
        "color: lime;",
        `Usuário ${user} foi localizado em https://api.github.com/users/${user}.`
      )
    }
    if (response.status === 404) {
      return styleModalError()
    }
    var image = await data.avatar_url
    handleUserImage.src = image
    const name = await data.name
    handleUserName.innerHTML = name
    const bio = await data.bio
    handleUserBio.innerHTML = bio
    const followers = await data.followers
    handleUserFollowers.innerHTML = `Followers: ${followers}`
    const following = await data.following
    handleUserFollowings.innerHTML = `Following: ${following}`
    const repos = await data.public_repos
    handleUserRepos.innerHTML = `Repositories: ${repos}`
    const location = await data.location
    handleUserLocation.innerHTML = `Location: ${location}`
  } catch(error) {
    console.error(error)
  } finally {
    console.log(`Busca por ${user} em https://api.github.com/users finalizada.`)
  }
}

clearInput.addEventListener('click', () => inputUserName.value = "")

// Funcion that open the error modal and write in console the error 404

function styleModalError() {
  modalError.style.display = 'block'
  modalBackground.style.display = 'block'
  console.error("Error 404 User not found")
}

// EventListener that close the error modal when click the button

btnClose.addEventListener('click', function closeModalError() {
  modalError.style.display = 'none'
  modalBackground.style.display = 'none'
})

// EventListener that execute the function searchUser if the key press is Enter

document.addEventListener('keypress', (e) => { if(e.which == 13) searchUser() })