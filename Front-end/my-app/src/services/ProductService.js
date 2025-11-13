import productApi from "../api/productApi"

export const ProductService = {
  async getProductHome(data) {
    try {
      const res = await productApi.getProductHome(data)
      return res.data
    } catch (error) {
      throw error
    }
  },
}