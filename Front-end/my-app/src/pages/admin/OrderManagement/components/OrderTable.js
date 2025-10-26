import { EyeOutlined } from "@ant-design/icons"
import { Button, Table, Tag } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function OrderTable() {
  const orders = [
    {
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
    },
    {
      id: 102,
      address: "45 Lê Lợi, Quận 1, TP.HCM",
      total: 15800000.0,
      methodDelivery: "Giao hàng tiêu chuẩn",
      methodPayment: "Chuyển khoản ngân hàng",
      statusMethodDelivery: "Đã giao",
      createdAt: "2025-10-18T14:10:00",
      updatedAt: "2025-10-22T10:00:00",
      user: {
        id: 2,
        fullName: "Trần Thị B",
        phoneNumber: "0912345678",
        email: "tranthib@gmail.com",
        image: "https://example.com/images/users/user2.png",
      },
      items: [
        {
          id: 1003,
          quantity: 1,
          productName: "Samsung Galaxy S24 Ultra",
          memoryName: "512GB",
          memoryPrice: 2000000.0,
          colorPrice: 300000.0,
          colorName: "Xám Titan",
        },
      ],
    },
    {
      id: 103,
      address: "78 Phan Chu Trinh, Quận Hải Châu, Đà Nẵng",
      total: 8200000.0,
      methodDelivery: "Giao hàng nhanh",
      methodPayment: "Ví Momo",
      statusMethodDelivery: "Đang xử lý",
      createdAt: "2025-10-25T11:20:00",
      updatedAt: "2025-10-25T11:20:00",
      user: {
        id: 3,
        fullName: "Lê Quốc Cường",
        phoneNumber: "0987765432",
        email: "lecuong@gmail.com",
        image: "https://example.com/images/users/user3.jpg",
      },
      items: [
        {
          id: 1004,
          quantity: 1,
          productName: "Xiaomi Redmi Note 14",
          memoryName: "128GB",
          memoryPrice: 600000.0,
          colorPrice: 0.0,
          colorName: "Xanh biển",
        },
        {
          id: 1005,
          quantity: 1,
          productName: "Ốp lưng chống sốc",
          memoryName: "Mặc định",
          memoryPrice: 0.0,
          colorPrice: 0.0,
          colorName: "Đen",
        },
      ],
    },
    {
      id: 104,
      address: "12 Bạch Mai, Hai Bà Trưng, Hà Nội",
      total: 36700000.0,
      methodDelivery: "Giao hàng tiêu chuẩn",
      methodPayment: "Thanh toán qua thẻ Visa",
      statusMethodDelivery: "Đã giao",
      createdAt: "2025-09-30T08:00:00",
      updatedAt: "2025-10-02T12:30:00",
      user: {
        id: 4,
        fullName: "Phạm Minh Đức",
        phoneNumber: "0978123456",
        email: "ducpham@gmail.com",
        image: "https://example.com/images/users/user4.jpg",
      },
      items: [
        {
          id: 1006,
          quantity: 1,
          productName: "MacBook Air M3",
          memoryName: "512GB",
          memoryPrice: 2500000.0,
          colorPrice: 0.0,
          colorName: "Bạc",
        },
        {
          id: 1007,
          quantity: 1,
          productName: "Magic Mouse",
          memoryName: "Mặc định",
          memoryPrice: 0.0,
          colorPrice: 200000.0,
          colorName: "Trắng",
        },
      ],
    },
  ]

  const navigate = useNavigate()

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: ["user", "fullName"],
      key: "user",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["user", "phoneNumber"],
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) =>
        total.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Trạng thái giao hàng",
      dataIndex: "statusMethodDelivery",
      key: "statusMethodDelivery",
      render: (status) => {
        let color = "blue"
        if (status === "Đã giao") color = "green"
        else if (status === "Đang xử lý") color = "orange"
        else if (status === "Đang giao") color = "purple"
        else if (status === "Đã hủy") color = "red"
        return <Tag color={color}>{status}</Tag>
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          type="primary"
          onClick={() => navigate(`/admin/order/${record.id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={orders}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: orders.length,
        onChange: (page, pageSize) =>
          setPagination({ current: page, pageSize }),
      }}
    />
  )
}

export default OrderTable
