import { Card, Descriptions, Table, Select, Button, message } from "antd"
import { useState } from "react"

const { Option } = Select

function OrderDetail() {
  const order = {
    id: 101,
    address: "123 Nguyễn Trãi, Quận 5, TP.HCM",
    total: 24500000.0,
    methodDelivery: "Giao hàng nhanh",
    methodPayment: "Thanh toán khi nhận hàng",
    statusMethodDelivery: "Đang giao",
    createdAt: "2025-10-20T09:30:00",
    updatedAt: "2025-10-21T15:45:00",
    user: {
      id: 1,
      fullName: "Nguyễn Văn A",
      phoneNumber: "0905123456",
      email: "nguyenvana@gmail.com",
      image: "https://example.com/images/users/user1.jpg",
    },
    items: [
      {
        id: 1001,
        quantity: 1,
        productName: "iPhone 15 Pro Max",
        memoryName: "256GB",
        memoryPrice: 1200000.0,
        colorPrice: 500000.0,
        colorName: "Titan Xanh",
      },
      {
        id: 1002,
        quantity: 2,
        productName: "AirPods Pro 2",
        memoryName: "Mặc định",
        memoryPrice: 0.0,
        colorPrice: 0.0,
        colorName: "Trắng",
      },
    ],
  }

  const [status, setStatus] = useState(order.statusMethodDelivery)
  const [loading, setLoading] = useState(false)

  const handleUpdateStatus = () => {
    setLoading(true)
    setTimeout(() => {
      message.success("Cập nhật trạng thái đơn hàng thành công!")
      setLoading(false)
    }, 1000)
  }

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Màu sắc",
      dataIndex: "colorName",
      key: "colorName",
    },
    {
      title: "Bộ nhớ",
      dataIndex: "memoryName",
      key: "memoryName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      key: "price",
      render: (_, record) =>
        (record.memoryPrice + record.colorPrice).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
  ]

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Card
        title={`Chi tiết đơn hàng #${order.id}`}
        extra={<Button>Quay lại</Button>}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Khách hàng">
            {order.user.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {order.user.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{order.address}</Descriptions.Item>
          <Descriptions.Item label="Phương thức giao hàng">
            {order.methodDelivery}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {order.methodPayment}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái giao hàng">
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              style={{ width: 200 }}
            >
              <Option value="Đang xử lý">Đang xử lý</Option>
              <Option value="Đang giao">Đang giao</Option>
              <Option value="Đã giao">Đã giao</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
            <Button
              type="primary"
              onClick={handleUpdateStatus}
              loading={loading}
              style={{ marginLeft: 10 }}
            >
              Cập nhật
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {order.total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {order.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">
            {order.updatedAt}
          </Descriptions.Item>
        </Descriptions>

        <h3 style={{ marginTop: 20 }}>Danh sách sản phẩm</h3>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={order.items}
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default OrderDetail
