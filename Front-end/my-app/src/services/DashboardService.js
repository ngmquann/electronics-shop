import dashboardApi from "../api/dashboardApi"

export const DashboardService = {
  async getDashboardData() {
    try {
      const res = await dashboardApi.getDashboardData()
      return res.data
    } catch (error) {
      throw error
    }
  },
}
