import { Card, Space } from "antd"
import Title from "antd/es/typography/Title"
import OrderTable from "./components/OrderTable"

function OrderManagement() {
  return (
    <Card
      title={
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            Quản lý đơn hàng
          </Title>
        </Space>
      }
    >
      <OrderTable />
    </Card>
  )
}

export default OrderManagement
