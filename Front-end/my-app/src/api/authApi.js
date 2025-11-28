import axiosClient from "../utils/axiosClient"

const authApi = {
  register: (data) => axiosClient.post("/user/register", data),
  login: (data) => axiosClient.post("/user/login", data),
  changePassword: (data) => axiosClient.post("/user/change-password", data),
  getInfoUser: () => axiosClient.get("/user/info"),
  updateInfoUser: (data) => axiosClient.post("/user/update-profile", data),
}

export default authApi
