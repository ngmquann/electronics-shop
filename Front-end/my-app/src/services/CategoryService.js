import categoryApi from "../api/categoryApi"

export const CategoryService = {
  async addCategory(name) {
    try {
      const res = await categoryApi.addCategory(name)
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

  async updateCategory(id, name) {
    try {
      const res = await categoryApi.updateCategory(id, name)
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
