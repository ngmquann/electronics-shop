import axiosClient from "../utils/axiosClient"

const paymentApi = {
  createPaymentVnPay: (data) =>
    axiosClient.post("/payment/create_payment_vnpay", data),
}

export default paymentApi
