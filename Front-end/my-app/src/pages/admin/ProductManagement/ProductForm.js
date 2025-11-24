import { Card, Steps, Button, Form, message } from "antd"
import { useState, useMemo } from "react"
import Step1BasicInfo from "./components/Step1BasicInfo"
import Step2Config from "./components/Step2Details"
import Step3Associates from "./components/Step3Confirm"
import { ProductService } from "../../../services/ProductService"

function AddProductForm() {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const next = async () => {
    try {
      const currentStepFields = getCurrentStepFields()
      await form.validateFields(currentStepFields)
      setCurrent((prev) => prev + 1)
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin!")
    }
  }

  const prev = () => setCurrent((prev) => prev - 1)

  const getCurrentStepFields = () => {
    switch (current) {
      case 0:
        return ["name", "detail", "note", "category", "images"]
      case 1:
        return ["colors", "memories"]
      case 2:
        return ["associates"]
      default:
        return []
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()

      const imagePromises = images.map(async (img) => {
        if (img.originFileObj) {
          const base64 = await convertToBase64(img.originFileObj)
          return { data: base64 }
        }
        return null
      })

      const convertedImages = await Promise.all(imagePromises)
      const validImages = convertedImages.filter((img) => img !== null)

      const payload = {
        name: values.name,
        note: values.note || "",
        detail: values.detail || "",
        categoryId: values.category,
        associateIds: values.associates || [],
        memoryIds: values.memories || [],
        images: validImages,
        colorCreateRequest: (values.colors || []).map((color) => ({
          name: color.name,
          price: parseFloat(color.price),
        })),
      }

      await ProductService.createProduct(payload)

      message.success("Thêm sản phẩm thành công!")
      form.resetFields()
      setImages([])
      setCurrent(0)
    } catch (error) {
      console.error("Lỗi:", error)
      message.error(error.message || "Thêm sản phẩm thất bại!")
    } finally {
      setLoading(false)
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]
        resolve(base64String)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const steps = useMemo(
    () => [
      {
        title: "Thông tin cơ bản",
        content: (
          <Step1BasicInfo form={form} images={images} setImages={setImages} />
        ),
      },
      {
        title: "Cấu hình sản phẩm",
        content: <Step2Config form={form} />,
      },
      {
        title: "Linh kiện (Associates)",
        content: <Step3Associates form={form} />,
      },
    ],
    [form, images]
  ) 

  return (
    <Card title="Thêm sản phẩm mới">
      <Steps
        current={current}
        items={steps.map((s) => ({ title: s.title }))}
        style={{ marginBottom: 24 }}
      />

      <Form
        layout="vertical"
        form={form}
        preserve={true} 
        initialValues={{
          colors: [{ name: "", price: "" }],
          memories: [],
          associates: [],
        }}
      >
        {/* Render tất cả steps nhưng ẩn những step không active */}
        <div style={{ display: current === 0 ? "block" : "none" }}>
          {steps[0].content}
        </div>
        <div style={{ display: current === 1 ? "block" : "none" }}>
          {steps[1].content}
        </div>
        <div style={{ display: current === 2 ? "block" : "none" }}>
          {steps[2].content}
        </div>

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
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Hoàn tất
            </Button>
          )}
        </div>
      </Form>
    </Card>
  )
}

export default AddProductForm
