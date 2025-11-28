import axiosClient from "../utils/axiosClient"

const orderApi = {
  getOrderById: (data) => axiosClient.get(`/order/${data}`),
  getListOrderByUser: () => axiosClient.get("/order/by-user"),
}

export default orderApi
