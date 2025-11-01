import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const { Option } = Select
const { Title } = Typography

function UserForm() {
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

  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (id) {
      setIsEditMode(true)
      const userToEdit = users.find((u) => u.id === Number(id))
      if (userToEdit) {
        form.setFieldsValue({
          ...userToEdit,
          dob: dayjs(userToEdit.dob, "DD/MM/YYYY"),
        })
      }
    }
  }, [id, form])

  const handleSubmit = (values) => {
    if (isEditMode) {
      console.log("Update")
    } else {
      console.log("Add new user")
    }
    navigate("/admin/user")
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "32px",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          {isEditMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input placeholder="Nhập họ tên" allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Nhập email" allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Ngày sinh"
                name="dob"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              >
                <DatePicker style={{ width: "100%" }} placement="bottomRight" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Xác nhận mật khẩu"
                dependencies={["password"]}
                name="confirmPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"))
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input.TextArea
                  placeholder="Nhập địa chỉ"
                  rows={3}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Vai trò" name="role" initialValue="User">
                <Select disabled={isEditMode}>
                  <Option value="User">User</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Trạng thái" name="status" initialValue="Active">
                <Select>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                {isEditMode ? "Cập nhật" : "Lưu"}
              </Button>
              <Button
                size="large"
                onClick={() => navigate("/admin/user")}
                danger
              >
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default UserForm
