import axiosClient from "../utils/axiosClient"

const orderApi = {
  getOrderById: (data) => axiosClient.get(`/order/${data}`),
  getListOrderByUser: () => axiosClient.get("/order/by-user"),
  getListOrderByAdmin: () => axiosClient.get("/order/by-admin"),
  changeStatus: (data) => axiosClient.post("/order/change-status", data),
}

export default orderApi
