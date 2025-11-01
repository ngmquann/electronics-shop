import React, { useEffect, useState } from "react"
import { Table, Tag, Button, Modal, Spin, message } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { UserService } from "../../../../services/UserService"

const UserTable = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const users = await UserService.getAllUser()
      setData(users)
    } catch (error) {
      messageApi.error(error.message || "Không thể tải danh sách người dùng")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const showModal = (id) => {
    setSelectedUserId(id)
    setOpen(true)
  }

  const handleOk = async () => {
    if (!selectedUserId) return
    setConfirmLoading(true)
    try {
      await UserService.deleteUser(selectedUserId)
      messageApi.success("Xóa người dùng thành công")
      setOpen(false)
      fetchUsers() // Refresh danh sách
    } catch (error) {
      messageApi.error(error.message || "Không thể xóa người dùng")
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "Admin" ? "volcano" : "blue"}>
          {role || "User"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/user/edit/${record.id}`)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showModal(record.id)}
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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      )}

      <Modal
        title="Xác nhận xóa"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
    </>
  )
}

export default UserTable
