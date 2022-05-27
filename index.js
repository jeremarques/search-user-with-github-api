const button = document.getElementById('searchUser')
const handleUserImage= document.getElementById('userImage')
const handleUserName = document.getElementById('userName')
const handleUserBio = document.getElementById('userBio')
const handleUserFollowers = document.getElementById('userFollowers')
const handleUserFollowings = document.getElementById('userFollowing')
const handleUserRepos = document.getElementById('userRepos')
const handleUserLocation = document.getElementById('userLocation')
const inputUserName = document.getElementById('enterUserName')
const btnClose = document.getElementById('close')
const modalError = document.querySelector('.error')
const modalBackground = document.getElementById('modalBackground')
const body = document.querySelector('body')

button.addEventListener('click',
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
      }
      if (response.status === 404) {
        return styleModalError()
      }
      const image = await data.avatar_url
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
      console.log(
        "%cBusca finalizada.",
        "color: lime;",
        `A busca de ${user} em https://api.github.com/users/${user} foi finalizada com sucesso.`
      )
    }
  }
)

function styleModalError() {
  modalError.style.display = 'block'
  modalBackground.style.display = 'block'
}

btnClose.addEventListener('click', function closeModalError() {
  modalError.style.display = 'none'
  body.classList.remove = 'opacityEffect'
  modalBackground.style.display = 'none'
})