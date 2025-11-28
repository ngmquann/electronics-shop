import cartApi from "../api/cartApi"

export const CartService = {
  async addCart(quantity, productId, colorId, memoryId) {
    try {
      const res = await cartApi.addToCart({
        quantity,
        productId,
        colorId,
        memoryId,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async changeQuantity(id, quantity) {
    try {
      const res = await cartApi.changeQuantity({
        id,
        quantity,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getCartByUser() {
    try {
      const res = await cartApi.getCartByUser()
      return res.data
    } catch (error) {
      throw error
    }
  },
}
