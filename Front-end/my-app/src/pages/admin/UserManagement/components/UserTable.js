import React, { useState } from "react"
import { Table, Tag, Space, Button, Modal } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
// import { users } from "../data"

const UserTable = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState(
    "Bạn chắc chắn muốn xóa người dùng này?"
  )
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    setModalText("Đang xóa người dùng...")
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }
  const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
  }

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "Admin",
      status: "Active",
      dob: "01/01/1990",
      phone: "0901111111",
      address: "Hà Nội",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      role: "User",
      status: "Inactive",
      dob: "02/02/1992",
      phone: "0902222222",
      address: "TP.HCM",
    },
    {
      id: 3,
      name: "Phạm Văn C",
      email: "c@gmail.com",
      role: "User",
      status: "Active",
      dob: "03/03/1993",
      phone: "0903333333",
      address: "Đà Nẵng",
    },
  ]
  const [data, setData] = useState(users)

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
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
        <Tag color={role === "Admin" ? "volcano" : "blue"}>{role}</Tag>
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
            onClick={() => showModal()}
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
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Xóa"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default UserTable
