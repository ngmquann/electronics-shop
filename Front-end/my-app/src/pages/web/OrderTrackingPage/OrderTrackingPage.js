import React, { useEffect, useState } from "react"
import { Card, Timeline, Tag, Spin, Descriptions, message } from "antd"
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  TruckOutlined,
} from "@ant-design/icons"
import { OrderService } from "../../../services/OrderService"
import { useParams } from "react-router-dom"

const statusMapping = {
  pending: { color: "orange", text: "Đang chờ lấy hàng" },
  shipping: { color: "purple", text: "Đang giao hàng" },
  completed: { color: "green", text: "Đã giao thành công" },
  canceled: { color: "red", text: "Đã hủy" },
}

const OrderTrackingPage = () => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  const fetchOrderDetail = async () => {
    try {
      const res = await OrderService.getOrderById(id)
      setOrder(res)
    } catch (error) {
      message.error("Không thể tải thông tin đơn hàng!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderDetail()
  }, [id])

  if (loading) return <Spin size="large" style={{ marginTop: 40 }} />

  if (!order) return null
  const currentStatus = order.statusMethodDelivery?.toLowerCase()

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <Card title={"Theo dõi đơn hàng"}>
        {/* Thông tin đơn hàng */}
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Trạng thái">
            <Tag color={statusMapping[currentStatus].color}>
              {statusMapping[currentStatus].text}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Tổng tiền">
            {order.total.toLocaleString()} đ
          </Descriptions.Item>

          <Descriptions.Item label="Phương thức thanh toán">
            {order.methodPayment === "vnpay" ? "Thanh toán VNPAY" : "COD"}
          </Descriptions.Item>

          <Descriptions.Item label="Hình thức giao hàng">
            {order.methodDelivery === "free"
              ? "Giao hàng tiêu chuẩn (Miễn phí)"
              : "Nhanh"}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ giao hàng">
            {order.address}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 24 }} />

        {/* Dòng thời gian theo dõi đơn */}
        <Card title="Tiến trình đơn hàng">
          <Timeline
            mode="left"
            items={[
              {
                label: order.createdAt,
                children: "Đơn hàng đã được tạo",
                dot: <ClockCircleOutlined />,
              },
              order.statusMethodDelivery !== "PENDING" &&
                order.confirmedAt && {
                  label: order.confirmedAt,
                  children: "Đơn hàng đã được xác nhận",
                  color: "blue",
                  dot: <CheckCircleOutlined />,
                },
              order.statusMethodDelivery === "SHIPPING" &&
                order.shippingAt && {
                  label: order.shippingAt,
                  children: "Đơn hàng đang được giao",
                  color: "purple",
                  dot: <TruckOutlined />,
                },
              order.statusMethodDelivery === "COMPLETED" &&
                order.completedAt && {
                  label: order.completedAt,
                  children: "Giao hàng thành công",
                  color: "green",
                  dot: <CheckCircleOutlined />,
                },
            ].filter(Boolean)}
          />
        </Card>
      </Card>
    </div>
  )
}

export default OrderTrackingPage
