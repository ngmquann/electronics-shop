export const saveToken = (token) => {
  localStorage.setItem("access_token", token)
}

export const clearAuth = () => {
  localStorage.removeItem("access_token")
}
