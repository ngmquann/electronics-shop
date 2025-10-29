import { Form, Input, Button, Checkbox, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import styles from "./auth.module.css"
import { useState } from "react"
import { AuthService } from "../../services/AuthService"

const { Title } = Typography

const SignupForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const user = await AuthService.register(
        values.name,
        values.email,
        values.password,
        values.confirmPassword
      )

      messageApi.success(`Welcome ${user}! Your account has been created.`)
      navigate("/login")
    } catch (error) {
      console.log("form error: ", error)

      const errMsg =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      messageApi.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <Title level={2} className={styles.title}>
        Create an Account
      </Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Full Name" size="large" />
        </Form.Item>

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

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("Passwords do not match"))
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" size="large" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("You must accept terms")),
            },
          ]}
        >
          <Checkbox>
            I agree to the <Link to="#">Terms & Conditions</Link>
          </Checkbox>
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SignupForm
