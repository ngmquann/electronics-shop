import axiosClient from "../utils/axiosClient";

const cartApi = {
  addToCart: (data) => axiosClient.post("/cart/add", data),
  changeQuantity: (data) => axiosClient.post("/cart/change-quantity", data),
  getCartByUser: () => axiosClient.get("/cart/by-user")
}

export default cartApi
