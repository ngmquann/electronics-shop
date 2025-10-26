import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, Table, Tag } from "antd"
import { useState } from "react"

function ProductTable() {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      detail: "Điện thoại cao cấp của Apple với chip A17 Pro mạnh mẽ",
      note: "Mẫu mới nhất ra mắt năm 2023",
      category: {
        id: 1,
        name: "Điện thoại",
      },
      images: [
        {
          id: 101,
          data: "https://example.com/images/iphone15pro_front.jpg",
        },
        {
          id: 102,
          data: "https://example.com/images/iphone15pro_back.jpg",
        },
      ],
      colors: [
        {
          id: 201,
          name: "Titanium Xanh",
          price: 27990000,
        },
        {
          id: 202,
          name: "Titanium Tự Nhiên",
          price: 27990000,
        },
      ],
      memories: [
        {
          id: 301,
          name: "128GB",
          price: 27990000,
        },
        {
          id: 302,
          name: "256GB",
          price: 29990000,
        },
      ],
      associates: [
        {
          id: 401,
          name: "Camera 48MP",
          logo: "FaCamera",
          type: "Camera",
        },
        {
          id: 402,
          name: "Pin 3274 mAh",
          logo: "FaBatteryFull",
          type: "Pin",
        },
        {
          id: 403,
          name: "Màn hình OLED 6.1 inch",
          logo: "FaMobileAlt",
          type: "Màn hình",
        },
      ],
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      detail: "Điện thoại Android cao cấp với chip Snapdragon 8 Gen 3",
      note: "Hỗ trợ bút S Pen và camera 200MP",
      category: {
        id: 1,
        name: "Điện thoại",
      },
      images: [
        {
          id: 103,
          data: "https://example.com/images/galaxy_s24_ultra_front.jpg",
        },
        {
          id: 104,
          data: "https://example.com/images/galaxy_s24_ultra_back.jpg",
        },
      ],
      colors: [
        {
          id: 203,
          name: "Đen Phantom",
          price: 31990000,
        },
        {
          id: 204,
          name: "Xám Titanium",
          price: 31990000,
        },
      ],
      memories: [
        {
          id: 303,
          name: "256GB",
          price: 31990000,
        },
        {
          id: 304,
          name: "512GB",
          price: 34990000,
        },
      ],
      associates: [
        {
          id: 404,
          name: "Camera 200MP",
          logo: "FaCamera",
          type: "Camera",
        },
        {
          id: 405,
          name: "Pin 5000 mAh",
          logo: "FaBatteryFull",
          type: "Pin",
        },
        {
          id: 406,
          name: "Màn hình AMOLED 6.8 inch",
          logo: "FaMobileAlt",
          type: "Màn hình",
        },
        {
          id: 407,
          name: "Bút S Pen",
          logo: "FaPenFancy",
          type: "Phụ kiện",
        },
      ],
    },
    {
      id: 3,
      name: "MacBook Air M3",
      detail: "Laptop siêu nhẹ sử dụng chip Apple M3, hiệu năng vượt trội",
      note: "Phù hợp cho sinh viên và dân văn phòng",
      category: {
        id: 2,
        name: "Laptop",
      },
      images: [
        {
          id: 105,
          data: "https://example.com/images/macbook_air_m3_open.jpg",
        },
      ],
      colors: [
        {
          id: 205,
          name: "Midnight",
          price: 29990000,
        },
        {
          id: 206,
          name: "Starlight",
          price: 29990000,
        },
      ],
      memories: [
        {
          id: 305,
          name: "8GB RAM / 256GB SSD",
          price: 29990000,
        },
        {
          id: 306,
          name: "16GB RAM / 512GB SSD",
          price: 34990000,
        },
      ],
      associates: [
        {
          id: 408,
          name: "Chip Apple M3",
          logo: "FaMicrochip",
          type: "CPU",
        },
        {
          id: 409,
          name: "Màn hình Retina 13.6 inch",
          logo: "FaLaptop",
          type: "Màn hình",
        },
        {
          id: 410,
          name: "Pin 52.6 Wh",
          logo: "FaBatteryFull",
          type: "Pin",
        },
      ],
    },
  ]

  const [data, setData] = useState(products)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleEdit = (record) => {
    console.log("Sửa sản phẩm:", record)
  }

  const handleDelete = (record) => {
    setSelectedProduct(record)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setLoading(true)
    setTimeout(() => {
      setData((prev) => prev.filter((item) => item.id !== selectedProduct.id))
      setIsDeleteModalOpen(false)
      setLoading(false)
    }, 1000)
  }

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Màu sắc",
      key: "colors",
      render: (_, record) => (
        <>
          {record.colors.map((color) => (
            <Tag key={color.id} color="blue">
              {color.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Bộ nhớ",
      key: "memories",
      render: (_, record) => (
        <>
          {record.memories.map((memory) => (
            <Tag key={memory.id} color="green">
              {memory.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data.length,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
      />
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn xóa sản phẩm <b>{selectedProduct?.name}</b>{" "}
          không?
        </p>
      </Modal>
    </>
  )
}

export default ProductTable
