import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, Table } from "antd"
import { forwardRef, useImperativeHandle, useState } from "react"

const CategoryTable = forwardRef((_, ref) => {
  const [form] = Form.useForm()
  const [data, setData] = useState([
    { id: 1, name: "Điện thoại" },
    { id: 2, name: "Máy tính bảng" },
    { id: 3, name: "Tai nghe" },
    { id: 4, name: "Máy ảnh" },
    { id: 5, name: "Chuột" },
    { id: 6, name: "Bàn phím" },
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
  const [editingCategory, setEditingCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useImperativeHandle(ref, () => ({
    openAddForm: () => handleAdd(),
  }))

  // === Thêm mới ===
  const handleAdd = () => {
    setEditingCategory(null)
    form.resetFields()
    setIsFormModalOpen(true)
  }

  // === Sửa ===
  const handleEdit = (record) => {
    setEditingCategory(record)
    form.setFieldsValue({ category: record.name })
    setIsFormModalOpen(true)
  }

  // === Xóa ===
  const handleDelete = (record) => {
    setSelectedCategory(record)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setLoading(true)
    setTimeout(() => {
      setData((prev) => prev.filter((item) => item.id !== selectedCategory.id))
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
        if (editingCategory) {
          // Update
          setData((prev) =>
            prev.map((item) =>
              item.id === editingCategory.id
                ? { ...item, name: values.category }
                : item
            )
          )
        } else {
          // Add
          const newId = data.length ? Math.max(...data.map((i) => i.id)) + 1 : 1
          const newCategory = { id: newId, name: values.category }
          setData((prev) => [...prev, newCategory])
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
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
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
          Bạn có chắc chắn muốn xóa danh mục <b>{selectedCategory?.name}</b>{" "}
          không?
        </p>
      </Modal>

      {/* Modal Thêm / Sửa */}
      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        open={isFormModalOpen}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={() => setIsFormModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default CategoryTable
