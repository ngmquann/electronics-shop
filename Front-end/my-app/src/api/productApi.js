import axiosClient from "../utils/axiosClient"

const productApi = {
  getProductHome: (number) =>
    axiosClient.get("/product/random", {
      params: { number },
    }),
  addProduct: (data) => axiosClient.post("/product/create-product", data),
  editProduct: (data) => axiosClient.post("/product/update-product", data),
  getAllProductByAdmin: () => axiosClient.get("/product/by-admin"),
  getProductById: (id) => axiosClient.get(`/product/by-id?productId=${id}`),
}

export default productApi
