import categoryApi from "../api/categoryApi"

export const CategoryService = {
  async addCategory(payload) {
    try {
      const res = await categoryApi.addCategory(payload)
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getAllCategories() {
    try {
      const res = await categoryApi.getAllCategories()
      return res.data
    } catch (error) {
      throw error
    }
  },

  async updateCategory(id, payload) {
    try {
      const res = await categoryApi.updateCategory(id, payload)
      return res.data
    } catch (error) {
      throw error
    }
  },

  async deleteCategory(id) {
    try {
      const res = await categoryApi.deleteCategory(id)
      return res.data
    } catch (error) {
      throw error
    }
  },
}
