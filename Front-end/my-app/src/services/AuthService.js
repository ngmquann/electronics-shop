import authApi from "../api/authApi"
import { saveToken } from "../utils/storage"

export const AuthService = {
  async register(name, email, password, confirmPassword) {
    try {
      const res = await authApi.register({
        fullName: name,
        email,
        password,
        confirmPassword,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async login(email, password) {
    try {
      const res = await authApi.login({
        email,
        password,
      })
      saveToken(res.data.token)

      return res
    } catch (error) {
      throw error
    }
  },

  async changePassword(oldPassword, newPassword, confirmPassword) {
    try {
      const res = await authApi.changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })
      return res
    } catch (error) {
      throw error
    }
  },

  async getInfoUser() {
    try {
      const res = await authApi.getInfoUser()
      return res.data
    } catch (error) {
      throw error
    }
  },

  async updateInfoUser(data) {
    try {
      const res = await authApi.updateInfoUser(data)
      return res.data
    } catch (error) {
      throw error
    }
  },
}
