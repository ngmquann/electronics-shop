import axiosClient from "../utils/axiosClient"

const dashboardApi = {
  getDashboardData() {
    return axiosClient.get("/dashboard")
  },
}

export default dashboardApi
