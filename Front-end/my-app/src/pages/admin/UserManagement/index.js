import { Button, Card, Space } from "antd"
import Title from "antd/es/typography/Title"
import UserTable from "./components/UserTable"
import { PlusOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

function UserManagement() {
  const navigate = useNavigate()
  const handleAddNew = () => {
    navigate("/admin/user/add")
  }

  return (
    <Card
      title={
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            Quản lý người dùng
          </Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Thêm mới
          </Button>
        </Space>
      }
    >
      <UserTable />
    </Card>
  )
}

export default UserManagement
