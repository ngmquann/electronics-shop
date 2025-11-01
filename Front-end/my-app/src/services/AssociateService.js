import associateApi from "../api/associateApi"

export const AssociateService = {
  async addAssociate(name, type, logo) {
    try {
      const res = await associateApi.addAssociate({
        name,
        type,
        logo,
      })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async getAllAssociates() {
    try {
      const res = await associateApi.getAllAssociates()
      return res.data
    } catch (error) {
      throw error
    }
  },

  async updateAssociate(id, name, type, logo) {
    try {
      console.log({ id, name, type, logo })

      const res = await associateApi.updateAssociate({ id, name, type, logo })
      return res.data
    } catch (error) {
      throw error
    }
  },

  async deleteAssociate(id) {
    try {
      const res = await associateApi.deleteAssociate(id)
      return res.data
    } catch (error) {
      throw error
    }
  },
}
