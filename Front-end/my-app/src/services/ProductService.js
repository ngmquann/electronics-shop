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

  async createProduct(productData) {
    try {
      const response = await productApi.addProduct(productData)
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Lỗi khi thêm sản phẩm")
      } else if (error.request) {
        throw new Error("Không thể kết nối đến server")
      } else {
        throw new Error(error.message)
      }
    }
  },

  async editProduct(productData) {
    try {
      const response = await productApi.editProduct(productData)
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Lỗi khi sửa sản phẩm")
      } else if (error.request) {
        throw new Error("Không thể kết nối đến server")
      } else {
        throw new Error(error.message)
      }
    }
  },

  async getAllProductByAdmin() {
    try {
      const res = await productApi.getAllProductByAdmin()
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getProductById(id) {
    try {
      const res = await productApi.getProductById(id)
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getProductByCategory(cateId) {
    try {
      const res = await productApi.getProductByCategory(cateId)
      console.log(res)

      return res.data
    } catch (error) {
      throw error
    }
  },
}
