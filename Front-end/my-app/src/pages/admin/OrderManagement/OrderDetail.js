import { Card, Descriptions, Table, Select, Button, message, Spin } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { OrderService } from "../../../services/OrderService"

const { Option } = Select

function OrderDetail() {
  const { id } = useParams() // lấy id từ URL

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const [updating, setUpdating] = useState(false)

  const statusMap = {
    PENDING: "Đang xử lý",
    SHIPPING: "Đang giao",
    COMPLETED: "Đã giao",
    CANCELED: "Đã hủy",
  }

  const reverseStatusMap = {
    "Đang xử lý": "PENDING",
    "Đang giao": "SHIPPING",
    "Đã giao": "COMPLETED",
    "Đã hủy": "CANCELED",
  }

  const fetchOrder = async () => {
    setLoading(true)
    try {
      const data = await OrderService.getOrderById(id)
      setOrder(data)
      setStatus(data.statusMethodDelivery)
    } catch (err) {
      message.error("Không thể tải đơn hàng")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrder()
  }, [id])

  if (loading) return <Spin size="large" style={{ margin: "50px" }} />

  if (!order) return <h2>Không tìm thấy đơn hàng</h2>

  const safeItems = Array.isArray(order.items) ? order.items : []

  // Bảng sản phẩm
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      title: "Màu sắc",
      dataIndex: "colorName",
    },
    {
      title: "Bộ nhớ",
      dataIndex: "memoryName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Đơn giá",
      render: (_, record) =>
        (record.memoryPrice + record.colorPrice).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
  ]

  const currentStatusLabel = statusMap[status]

  const handleUpdateStatus = async () => {
    setUpdating(true)
    try {
      const res = await OrderService.changeStatus({
        orderId: order.id,
        status: status,
      })

      message.success(res.message || "Cập nhật trạng thái đơn hàng thành công!")

      fetchOrder()
    } catch (err) {
      message.error("Lỗi cập nhật trạng thái")
    }
    setUpdating(false)
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Card
        title={`Chi tiết đơn hàng #${order.id}`}
        extra={<Button onClick={() => window.history.back()}>Quay lại</Button>}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Khách hàng">
            {order.user?.fullName}
          </Descriptions.Item>

          <Descriptions.Item label="Số điện thoại">
            {order.user?.phoneNumber}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {order.user?.email}
          </Descriptions.Item>

          <Descriptions.Item label="Ảnh khách hàng">
            {order.user?.image ? (
              <img
                src={order.user.image}
                alt="avatar"
                style={{ width: 80, borderRadius: "8px" }}
              />
            ) : (
              "Không có"
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ">{order.address}</Descriptions.Item>

          <Descriptions.Item label="Phương thức giao hàng">
            {order.methodDelivery === "free"
              ? "Miễn phí"
              : order.methodDelivery}
          </Descriptions.Item>

          <Descriptions.Item label="Phương thức thanh toán">
            {order.methodPayment === "vnpay" ? "VNPay" : order.methodPayment}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái giao hàng">
            <Select
              value={currentStatusLabel}
              onChange={(label) => setStatus(reverseStatusMap[label])}
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
              loading={updating}
              style={{ marginLeft: 10 }}
            >
              Cập nhật
            </Button>
          </Descriptions.Item>

          <Descriptions.Item label="Tổng tiền">
            {Number(order.total).toLocaleString("vi-VN", {
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
          dataSource={safeItems}
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default OrderDetail
