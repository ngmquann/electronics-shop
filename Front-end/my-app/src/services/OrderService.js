import orderApi from "../api/orderApi"

export const OrderService = {
  async getOrderById(id) {
    try {
      const res = await orderApi.getOrderById(id)
      return res.data
    } catch (error) {
      throw error
    }
  },
  async getListOrderByUser() {
    try {
      const res = await orderApi.getListOrderByUser()
      return res.data
    } catch (error) {
      throw error
    }
  },
  async getListOrderByAdmin() {
    try {
      const res = await orderApi.getListOrderByAdmin()
      return res.data
    } catch (error) {
      throw error
    }
  },
  async changeStatus(data) {
    try {
      const res = await orderApi.changeStatus(data)
      return res.data
    } catch (error) {
      throw error
    }
  },
}
