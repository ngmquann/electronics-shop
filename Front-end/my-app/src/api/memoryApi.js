import axiosClient from "../utils/axiosClient"

const memoryApi = {
  addMemory: (data) => axiosClient.post("/memory/create", data),
  getAllMemory: () => axiosClient.get("/memory/all"),
  updateMemory: (id, data) => axiosClient.put(`/memory/${id}`, data),
  deleteMemory: (id) => axiosClient.delete(`/memory/${id}`),
}

export default memoryApi
