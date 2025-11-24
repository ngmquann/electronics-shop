import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Spin,
  Table,
  Typography,
} from "antd"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import * as FaIcons from "react-icons/fa"
import * as MdIcons from "react-icons/md"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as BiIcons from "react-icons/bi"
import * as IoIcons from "react-icons/io"
import * as Io5Icons from "react-icons/io5"
import * as RiIcons from "react-icons/ri"
import * as GiIcons from "react-icons/gi"
import * as TbIcons from "react-icons/tb"
import * as LuIcons from "react-icons/lu"
import * as FiIcons from "react-icons/fi"
import * as SlIcons from "react-icons/sl"
import * as CgIcons from "react-icons/cg"
import * as TfiIcons from "react-icons/tfi"
import * as PiIcons from "react-icons/pi"
import * as GoIcons from "react-icons/go"
import * as GoIcons6 from "react-icons/fa6"
import * as CiIcons from "react-icons/ci"
import { AssociateService } from "../../../../services/AssociateService"

const { Text } = Typography

const AccessoriesTable = forwardRef((_, ref) => {
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
  const [editingAccessory, setEditingAccessory] = useState(null)
  const [selectedAccessory, setSelectedAccessory] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()

  useImperativeHandle(ref, () => ({
    openAddForm: () => handleAdd(),
  }))

  const fetchAssociates = async () => {
    setLoading(true)
    try {
      const associates = await AssociateService.getAllAssociates()
      setData(associates)
    } catch (error) {
      messageApi.error(error.message || "Không thể tải danh sách linh kiện")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssociates()
  }, [])

  // === Thêm mới ===
  const handleAdd = () => {
    setEditingAccessory(null)
    form.resetFields()
    setIsFormModalOpen(true)
  }

  // === Sửa ===
  const handleEdit = (record) => {
    setEditingAccessory(record)
    form.setFieldsValue({
      name: record.name,
      type: record.type,
      logo: record.logo,
    })
    setIsFormModalOpen(true)
  }

  // === Xóa ===
  const handleDelete = (record) => {
    setSelectedAccessory(record)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedAccessory) return
    setLoading(true)
    try {
      await AssociateService.deleteAssociate(selectedAccessory.id)
      messageApi.success("Xóa linh kiện thành công")
      setIsDeleteModalOpen(false)
      fetchAssociates()
    } catch (error) {
      messageApi.error(error.message || "Không thể xóa linh kiện")
    } finally {
      setLoading(false)
    }
  }

  // === Submit Form (Add/Edit) ===
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      if (editingAccessory) {
        // Update
        await AssociateService.updateAssociate(
          editingAccessory.id,
          values.name,
          values.type,
          values.logo
        )
        messageApi.success("Cập nhật linh kiện thành công")
      } else {
        // Add
        await AssociateService.addAssociate(
          values.name,
          values.type,
          values.logo
        )
        messageApi.success("Thêm linh kiện thành công")
      }

      form.resetFields()
      setIsFormModalOpen(false)
      fetchAssociates()
    } catch (error) {
      messageApi.error(error.message || "Không thể lưu danh mục")
    } finally {
      setLoading(false)
    }
  }

  const allIcons = {
    ...FaIcons,
    ...MdIcons,
    ...AiIcons,
    ...BsIcons,
    ...BiIcons,
    ...IoIcons,
    ...Io5Icons,
    ...RiIcons,
    ...GiIcons,
    ...TbIcons,
    ...LuIcons,
    ...FiIcons,
    ...SlIcons,
    ...CgIcons,
    ...TfiIcons,
    ...PiIcons,
    ...GoIcons,
    ...GoIcons6,
    ...CiIcons,
  }

  const getIconByName = (iconName) => {
    const IconComponent = allIcons[iconName]
    return IconComponent ? <IconComponent size={20} /> : <span>{iconName}</span>
  }

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Tên linh kiện",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Icon",
      dataIndex: "logo",
      key: "logo",
      render: (iconName) => getIconByName(iconName),
    },
    {
      title: "Giá trị",
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
              Bạn có chắc chắn muốn xóa linh kiện{" "}
              <b>{selectedAccessory?.type}</b> không?
            </p>
          </Modal>

          {/* Modal Thêm / Sửa */}
          <Modal
            title={editingAccessory ? "Chỉnh sửa bộ nhớ" : "Thêm bộ nhớ mới"}
            open={isFormModalOpen}
            onOk={handleSubmit}
            confirmLoading={loading}
            onCancel={() => setIsFormModalOpen(false)}
            okText="Lưu"
            cancelText="Hủy"
          >
            <Text type="secondary">
              👉 Vào{" "}
              <a
                href="https://react-icons.github.io/react-icons/"
                target="_blank"
                rel="noreferrer"
              >
                https://react-icons.github.io/react-icons/
              </a>{" "}
              để chọn icon và copy tên component (VD: FaCamera, FaBatteryFull)
            </Text>
            <Form form={form} layout="vertical">
              <Form.Item
                label="Tên linh kiện"
                name="type"
                rules={[
                  { required: true, message: "Vui lòng nhập tên linh kiện" },
                ]}
              >
                <Input placeholder="Nhập tên linh kiện" />
              </Form.Item>
              <Form.Item
                label="Giá trị"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập giá trị" }]}
              >
                <Input placeholder="Nhập giá trị" />
              </Form.Item>
              <Form.Item
                label="Icon"
                name="logo"
                rules={[
                  { required: true, message: "Vui lòng nhập giá trị icon" },
                ]}
              >
                <Input placeholder="Nhập giá trị icon" />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </>
  )
})

export default AccessoriesTable
