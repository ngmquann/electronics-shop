import axiosClient from "../utils/axiosClient"

const associateApi = {
  addAssociate: (data) => axiosClient.post("/associates/create", data),
  getAllAssociates: () => axiosClient.get("/associates/by-admin"),
  updateAssociate: (data) => axiosClient.post("/associates/update", data),
  deleteAssociate: (id) => axiosClient.delete(`/associates/delete/${id}`),
}

export default associateApi
