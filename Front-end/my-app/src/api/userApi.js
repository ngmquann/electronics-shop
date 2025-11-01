import axiosClient from "../utils/axiosClient"

const userApi = {
  getAllUser: () => axiosClient.get("/user/all-user"),
  deleteUser: (id) => axiosClient.delete(`/user/by-admin/${id}`),
}

export default userApi
