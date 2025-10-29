import { Form, Input, Button, Checkbox, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import styles from "./auth.module.css"
import { useState } from "react"
import { AuthService } from "../../services/AuthService"

const { Title } = Typography

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    setLoading(true)

    try {
      await AuthService.login(values.email, values.password)

      messageApi.success("Login successful")
      navigate("/")
    } catch (error) {
      const errMsg = error.response?.data?.message || "Login failed"
      messageApi.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <Title level={2} className={styles.title}>
        Welcome Back
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="Email Address" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Checkbox>Remember me</Checkbox>
            <Link to="#">Forgot Password?</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ borderRadius: 10 }}
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
