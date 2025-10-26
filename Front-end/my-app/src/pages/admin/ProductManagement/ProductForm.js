import { Card, Steps, Button, Form, message } from "antd"
import { useState } from "react"
import Step1BasicInfo from "./components/Step1BasicInfo"
import Step2Config from "./components/Step2Details"
import Step3Associates from "./components/Step3Confirm"

// const { Step } = Steps

function AddProductForm() {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [images, setImages] = useState([])

  const next = () => setCurrent((prev) => prev + 1)
  const prev = () => setCurrent((prev) => prev - 1)

  const handleSubmit = (values) => {
    const payload = { ...values, images }
    console.log("✅ Dữ liệu sản phẩm:", payload)
    message.success("Thêm sản phẩm thành công!")
  }

  const steps = [
    {
      title: "Thông tin cơ bản",
      content: (
        <Step1BasicInfo form={form} images={images} setImages={setImages} />
      ),
    },
    { title: "Cấu hình sản phẩm", content: <Step2Config form={form} /> },
    {
      title: "Linh kiện (Associates)",
      content: <Step3Associates form={form} />,
    },
  ]

  return (
    <Card title="Thêm sản phẩm mới" bordered={false}>
      <Steps
        current={current}
        items={steps.map((s) => ({ title: s.title }))}
        style={{ marginBottom: 24 }}
      />

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          colors: [{}],
          memories: [{}],
          associates: [{}],
        }}
      >
        {steps[current].content}

        <div style={{ marginTop: 24, textAlign: "right" }}>
          {current > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Quay lại
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Tiếp theo
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Hoàn tất
            </Button>
          )}
        </div>
      </Form>
    </Card>
  )
}

export default AddProductForm
