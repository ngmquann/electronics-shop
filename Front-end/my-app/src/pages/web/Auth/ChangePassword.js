import { useState } from "react"
import { Card, Form, Input, Button, Typography, message } from "antd"
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons"
import { AuthService } from "../../../services/AuthService"
import { useNavigate } from "react-router-dom"

const { Title } = Typography

export default function ChangePassword() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    if (values.newPassword === values.oldPassword) {
      return message.error("Mật khẩu mới không được trùng mật khẩu cũ!")
    }

    setLoading(true)

    try {
      const res = await AuthService.changePassword(
        values.oldPassword,
        values.newPassword,
        values.confirmPassword
      )

      if (res.data.message === "Đổi mật khẩu thành công!") {
        localStorage.removeItem("access_token")
        localStorage.removeItem("addresses")
      }

      message.success(res)
      navigate("/")
    } catch (err) {
      message.error("Đổi mật khẩu thất bại!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: "0 12px",
      }}
    >
      <Card>
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Đổi mật khẩu
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          {/* Mật khẩu cũ */}
          <Form.Item
            label="Mật khẩu hiện tại"
            name="oldPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu hiện tại"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Mật khẩu mới */}
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === getFieldValue("newPassword")) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  )
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Nhập lại mật khẩu mới"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
