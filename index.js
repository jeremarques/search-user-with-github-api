const button = document.getElementById('searchUser')
const handleUserImage= document.getElementById('userImage')
const handleUserName = document.getElementById('userName')
const handleUserBio = document.getElementById('userBio')
const handleUserFollowers = document.getElementById('userFollowers')
const handleUserFollowings = document.getElementById('userFollowing')
const inputUserName = document.getElementById('enterUserName')

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