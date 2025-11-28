import React, { useEffect, useState } from "react"
import { Card, Tag, List, Avatar, message, Spin } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { OrderService } from "../../../services/OrderService"
import { useNavigate } from "react-router-dom"

const statusMapping = {
  pending: { color: "orange", text: "Đang chờ lấy hàng" },
  shipping: { color: "purple", text: "Đang giao hàng" },
  completed: { color: "green", text: "Đã giao thành công" },
  canceled: { color: "red", text: "Đã hủy" },
}

const OrderListPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchOrders = async () => {
    try {
      const res = await OrderService.getListOrderByUser()
      setOrders(res)
    } catch (error) {
      message.error("Không thể tải danh sách đơn hàng!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <Spin size="large" style={{ marginTop: 40 }} />

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <Card title="Đơn hàng của bạn">
        <List
          itemLayout="vertical"
          dataSource={orders}
          renderItem={(order) => {
            const statusKey = order.statusMethodDelivery.toLowerCase()

            return (
              <Card style={{ marginBottom: 16, cursor: "pointer" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ margin: 0 }}>Đơn hàng #{order.id}</h3>
                  <RightOutlined
                    onClick={() => navigate(`/order-tracking/${order.id}`)}
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <Tag color={statusMapping[statusKey].color}>
                    {statusMapping[statusKey].text}
                  </Tag>
                </div>

                <div style={{ fontSize: 14, marginTop: 8 }}>
                  <strong>Ngày đặt: </strong> {order.createdAt}
                </div>

                <div style={{ fontSize: 14 }}>
                  <strong>Tổng tiền: </strong> {order.total.toLocaleString()} đ
                </div>

                <List
                  dataSource={order.items}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            shape="square"
                            size={50}
                            src={`data:image/jpeg;base64,${item.imageUrl}`}
                          />
                        }
                        title={`${item.productName} - ${item.memoryName} - ${item.colorName}`}
                        description={`Số lượng: ${item.quantity} | Giá: ${(
                          item.memoryPrice + item.colorPrice
                        ).toLocaleString()} đ`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )
          }}
        />
      </Card>
    </div>
  )
}

export default OrderListPage
