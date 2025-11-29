import { Card, message, Space, Spin } from "antd"
import Title from "antd/es/typography/Title"
import OrderTable from "./components/OrderTable"
import { useEffect, useState } from "react"
import { OrderService } from "../../../services/OrderService"

function OrderManagement() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const users = await OrderService.getListOrderByAdmin()
      setOrders(users)
    } catch (error) {
      messageApi.error(error.message || "Không thể tải danh sách người dùng")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      {contextHolder}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card
          title={
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
              <Title level={4} style={{ margin: 0 }}>
                Quản lý đơn hàng
              </Title> 
            </Space>
          }
        >
          <OrderTable orders={orders} />
        </Card>
      )}
    </>
  )
}

export default OrderManagement
