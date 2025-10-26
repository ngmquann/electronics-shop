import { Form, Input, Button, Checkbox, Typography } from "antd"
import { Link } from "react-router-dom"
import styles from "./auth.module.css"

const { Title } = Typography

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Login values:", values)
  }

  return (
    <>
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
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm