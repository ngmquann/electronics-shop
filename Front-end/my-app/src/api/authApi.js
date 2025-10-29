import axiosClient from "../utils/axiosClient"

const authApi = {
  register: (data) => axiosClient.post("/user/register", data),

  login: (data) => axiosClient.post("/user/login", data),
}

export default authApi
