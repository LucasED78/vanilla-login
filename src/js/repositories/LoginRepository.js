function LoginRepository (){}

/**
 * Request server to login
 * @param {string} username 
 * @param {string} password 
 * @return {Promise}
 */
LoginRepository.prototype.login = async function(username, password) {
  const response = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      password
    })
  })

  return response.json()
}

export default LoginRepository