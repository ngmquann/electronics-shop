import userApi from "../api/userApi"

export const UserService = {
  async getAllUser() {
    try {
      const res = await userApi.getAllUser()
      return res.data
    } catch (error) {
      throw error
    }
  },

  async deleteUser(id) {
    try {
      const res = await userApi.deleteUser(id)
      return res.data
    } catch (error) {
      throw error
    }
  },
}
