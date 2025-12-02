import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Image, message, Modal, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { ProductService } from "../../../../services/ProductService"
import { useNavigate } from "react-router-dom"

function ProductTable() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await ProductService.getAllProductByAdmin()
        setData(res)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleEdit = (id) => {
    navigate(`/admin/product/edit/${id}`)
  }

  const handleDelete = (record) => {
    setSelectedProduct(record)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    setLoading(true)
    try {
      await ProductService.deleteProduct(selectedProduct.id)
      setData((prev) => prev.filter((item) => item.id !== selectedProduct.id))
      setIsDeleteModalOpen(false)
      messageApi.success("Xóa sản phẩm thành công")
    } catch (error) {
      console.error(error)
      messageApi.error("Lỗi khi xóa sản phẩm")
    } finally {
      setLoading(false)
    }
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
    // {
    //   title: "Danh mục",
    //   dataIndex: ["category", "name"],
    //   key: "category",
    // },
    {
      title: "Hình ảnh",
      key: "image",
      width: 120,
      render: (_, record) => {
        const img = record.imageData?.[0]?.data
        return img ? (
          <Image src={`data:image/jpeg;base64,${img}`} />
        ) : (
          <span>Không có ảnh</span>
        )
      },
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
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          />
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
      {contextHolder}
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
