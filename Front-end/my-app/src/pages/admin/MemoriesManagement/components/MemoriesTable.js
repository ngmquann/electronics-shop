import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, Table } from "antd"
import { forwardRef, useImperativeHandle, useState } from "react"

const MemoryTable = forwardRef((_, ref) => {
  const [form] = Form.useForm()
  const [data, setData] = useState([
    { id: 1, name: "128GB", price: "2.000.000 VNĐ" },
    { id: 2, name: "256GB", price: "2.500.000 VNĐ" },
    { id: 3, name: "512GB", price: "3.000.000 VNĐ" },
  ])

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  // Xử lý edit
  const [editingMemory, setEditingMemory] = useState(null)
  const [selectedMemory, setSelectedMemory] = useState(null)

  useImperativeHandle(ref, () => ({
    openAddForm: () => handleAdd(),
  }))

  // === Thêm mới ===
  const handleAdd = () => {
    setEditingMemory(null)
    form.resetFields()
    setIsFormModalOpen(true)
  }

  // === Sửa ===
  const handleEdit = (record) => {
    setEditingMemory(record)
    form.setFieldsValue({ memory: record.name, price: record.price })
    setIsFormModalOpen(true)
  }

  // === Xóa ===
  const handleDelete = (record) => {
    setSelectedMemory(record)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setLoading(true)
    setTimeout(() => {
      setData((prev) => prev.filter((item) => item.id !== selectedMemory.id))
      setIsDeleteModalOpen(false)
      setLoading(false)
    }, 1000)
  }

  // === Submit Form (Add/Edit) ===
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      setTimeout(() => {
        if (editingMemory) {
          // Update
          setData((prev) =>
            prev.map((item) =>
              item.id === editingMemory.id
                ? { ...item, name: values.memory, price: values.price }
                : item
            )
          )
        } else {
          // Add
          const newId = data.length ? Math.max(...data.map((i) => i.id)) + 1 : 1
          const newMemory = {
            id: newId,
            name: values.memory,
            price: values.price,
          }
          setData((prev) => [...prev, newMemory])
        }

        form.resetFields()
        setLoading(false)
        setIsFormModalOpen(false)
      }, 1000)
    } catch (error) {
      console.error("Validation failed:", error)
    }
  }

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Tên bộ nhớ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
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
      {/* <IconPickerItem /> */}
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

      {/* Modal Xóa */}
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
          Bạn có chắc chắn muốn xóa bộ nhớ <b>{selectedMemory?.name}</b> không?
        </p>
      </Modal>

      {/* Modal Thêm / Sửa */}
      <Modal
        title={editingMemory ? "Chỉnh sửa bộ nhớ" : "Thêm bộ nhớ mới"}
        open={isFormModalOpen}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={() => setIsFormModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên bộ nhớ"
            name="memory"
            rules={[{ required: true, message: "Vui lòng nhập tên bộ nhớ" }]}
          >
            <Input placeholder="Nhập tên bộ nhớ" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input placeholder="Nhập giá" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default MemoryTable
