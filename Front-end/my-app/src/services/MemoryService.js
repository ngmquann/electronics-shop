import memoryApi from "../api/memoryApi"

export const MemoryService = {
  async addMemory(name, price) {
    try {
      const res = await memoryApi.addMemory({
        name,
        price,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getAllMemory() {
    try {
      const res = await memoryApi.getAllMemory()
      return res.data
    } catch (error) {
      throw error
    }
  },

  async updateMemory(id, name, price) {
    try {
      const res = await memoryApi.updateMemory(id, { name, price })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async deleteMemory(id) {
    try {
      const res = await memoryApi.deleteMemory(id)
      return res.data
    } catch (error) {
      throw error
    }
  },
}
