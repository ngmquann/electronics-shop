import React from "react"
import { Result, Button } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import { useNavigate, useSearchParams } from "react-router-dom"
import "./OrderSuccess.css"

const OrderSuccess = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const orderId = searchParams.get("orderId")

  return (
    <div className="order-success-container">
      <Result
        icon={<CheckCircleOutlined className="success-icon" />}
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được ghi nhận và đang chờ xác nhận."
        extra={[
          <Button
            key="orders"
            type="primary"
            size="large"
            onClick={() => navigate(`/order-tracking/${orderId}`)}
          >
            Xem đơn hàng
          </Button>,
          <Button key="home" size="large" onClick={() => navigate("/")}>
            Về trang chủ
          </Button>,
        ]}
      />
    </div>
  )
}

export default OrderSuccess
