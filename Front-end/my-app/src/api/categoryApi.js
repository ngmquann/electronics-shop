import axiosClient from "../utils/axiosClient"

const categoryApi = {
  addCategory: (data) => axiosClient.post("/category/create", data),
  getAllCategories: () => axiosClient.get("/category/all"),
  updateCategory: (id, data) => axiosClient.put(`/category/${id}`, data),
  deleteCategory: (id) => axiosClient.delete(`/category/${id}`),
}

export default categoryApi
