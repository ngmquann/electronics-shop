import axiosClient from "../utils/axiosClient";

const cartApi = {
  addToCart: (data) => axiosClient.post("/cart/add", data),
}

export default cartApi
