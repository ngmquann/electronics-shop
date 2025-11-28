import React, { useState, useEffect } from "react"
import { message } from "antd"
import Step1Address from "./Step1Address"
import Step2Shipping from "./Step2Shipping"
import Step3Payment from "./Step3Payment"
import { CartService } from "../../../services/CartService"
import { PaymentService } from "../../../services/PaymentService"

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [shippingMethod, setShippingMethod] = useState("free")
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCartData()
  }, [])

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const data = await CartService.getCartByUser()
      setCartItems(data)
    } catch (error) {
      message.error("Không thể tải giỏ hàng")
      console.error("Error fetching cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePay = async () => {
    try {
      if (!selectedAddress) {
        message.error("Vui lòng chọn địa chỉ giao hàng")
        return
      }

      setLoading(true)

      const methodPayment = "vnpay"
      const methodDelivery = shippingMethod

      const total = cartItems.reduce((sum, item) => {
        const price = item.product.colors?.[0]?.price || 0
        return sum + price * item.quantity
      }, 0)

      const tax = total * 0.1
      const shipping = shippingMethod === "express" ? 50000 : 0
      const finalTotal = total + tax + shipping
      const formatAddress = `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zipCode}`

      const res = await PaymentService.createPaymentVnPay(
        finalTotal,
        methodPayment,
        methodDelivery,
        formatAddress
      )

      if (res != null) {
        window.location.href = res
      } else {
        message.error("Không nhận được URL thanh toán từ máy chủ")
      }
    } catch (error) {
      console.error(error)
      message.error("Thanh toán thất bại!")
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Address
            onNext={handleNext}
            onBack={handleBack}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )
      case 1:
        return (
          <Step2Shipping
            onNext={handleNext}
            onBack={handleBack}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
          />
        )
      case 2:
        return (
          <Step3Payment
            onBack={handleBack}
            onPay={handlePay}
            cartItems={cartItems}
            selectedAddress={selectedAddress}
            shippingMethod={shippingMethod}
            loading={loading}
          />
        )
      default:
        return (
          <Step1Address
            onNext={handleNext}
            onBack={handleBack}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )
    }
  }

  return <div className="checkout-page">{renderStep()}</div>
}

export default Checkout
