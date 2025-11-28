import paymentApi from "../api/paymentApi"

export const PaymentService = {
  async createPaymentVnPay(total, methodPayment, methodDelivery, address) {
    try {
      const res = await paymentApi.createPaymentVnPay({
        total,
        methodPayment,
        methodDelivery,
        address,
      })
      console.log(res)

      return res.data
    } catch (error) {
      throw error
    }
  },
}
