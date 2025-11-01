import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, message, Modal, Spin, Table } from "antd"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { CategoryService } from "../../../../services/CategoryService"

const CategoryTable = forwardRef((_, ref) => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])

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

  const [messageApi, contextHolder] = message.useMessage()

  useImperativeHandle(ref, () => ({
    openAddForm: () => handleAdd(),
  }))

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const categories = await CategoryService.getAllCategories()
      setData(categories)
    } catch (error) {
      messageApi.error(error.message || "Không thể tải danh sách danh mục")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const confirmDelete = async () => {
    if (!selectedCategory) return
    setLoading(true)
    try {
      await CategoryService.deleteCategory(selectedCategory.id)
      messageApi.success("Xóa danh mục thành công")
      setIsDeleteModalOpen(false)
      fetchCategories()
    } catch (error) {
      messageApi.error(error.message || "Không thể xóa danh mục")
    } finally {
      setLoading(false)
    }
  }

  // === Submit Form (Add/Edit) ===
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      if (editingCategory) {
        // Update
        await CategoryService.updateCategory(editingCategory.id, {
          name: values.category,
        })
        messageApi.success("Cập nhật danh mục thành công")
      } else {
        // Add
        await CategoryService.addCategory({ name: values.category })
        messageApi.success("Thêm danh mục thành công")
      }

      form.resetFields()
      setIsFormModalOpen(false)
      fetchCategories()
    } catch (error) {
      messageApi.error(error.message || "Không thể lưu danh mục")
    } finally {
      setLoading(false)
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
      {contextHolder}
      {loading ? (
        <Spin size="large" />
      ) : (
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
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục" },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </>
  )
})

export default CategoryTable
