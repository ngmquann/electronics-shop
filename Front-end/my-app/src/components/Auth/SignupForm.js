import { Form, Input, Button, Checkbox, Typography } from "antd"
import { Link } from "react-router-dom"
import styles from "./auth.module.css"

const { Title } = Typography

const SignupForm = () => {
  const onFinish = (values) => {
    console.log("Signup values:", values)
  }

  return (
    <>
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
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SignupForm
