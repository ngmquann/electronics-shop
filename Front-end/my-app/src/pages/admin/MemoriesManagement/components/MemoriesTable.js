import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, message, Modal, Spin, Table } from "antd"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { MemoryService } from "../../../../services/MemoryService"

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
  const [messageApi, contextHolder] = message.useMessage()

  useImperativeHandle(ref, () => ({
    openAddForm: () => handleAdd(),
  }))

  const fetchMemory = async () => {
    setLoading(true)
    try {
      const memories = await MemoryService.getAllMemory()
      setData(memories)
    } catch (error) {
      messageApi.error(error.message || "Không thể tải danh sách bộ nhớ")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMemory()
  }, [])

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

  const confirmDelete = async () => {
    if (!selectedMemory) return
    setLoading(true)
    try {
      await MemoryService.deleteMemory(selectedMemory.id)
      messageApi.success("Xóa bộ nhớ thành công")
      setIsDeleteModalOpen(false)
      fetchMemory()
    } catch (error) {
      messageApi.error(error.message || "Không thể xóa bộ nhớ")
    } finally {
      setLoading(false)
    }
  }

  // === Submit Form (Add/Edit) ===
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      if (editingMemory) {
        // Update
        await MemoryService.updateMemory(
          editingMemory.id,
          values.memory,
          values.price
        )
        messageApi.success("Cập nhật bộ nhớ thành công")
      } else {
        // Add
        await MemoryService.addMemory(values.memory, values.price)
        messageApi.success("Thêm bộ nhớ thành công")
      }

      form.resetFields()
      setIsFormModalOpen(false)
      fetchMemory()
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
              Bạn có chắc chắn muốn xóa bộ nhớ <b>{selectedMemory?.name}</b>{" "}
              không?
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
                rules={[
                  { required: true, message: "Vui lòng nhập tên bộ nhớ" },
                ]}
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
      )}
    </>
  )
})

export default MemoryTable
