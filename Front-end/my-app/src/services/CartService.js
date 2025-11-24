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
}
