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
  getProductByCategory: (cateId) =>
    axiosClient.get(`/product/by-category?categoryId=${cateId}`),
  deleteProduct: (id) => axiosClient.delete(`/product/deletion/${id}`),
}

export default productApi
