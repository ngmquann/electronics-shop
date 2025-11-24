import { Card, Steps, Button, Form, message, Spin } from "antd"
import { useEffect, useState } from "react"
import Step1BasicInfo from "./components/Step1BasicInfo"
import Step2Config from "./components/Step2Details"
import Step3Associates from "./components/Step3Confirm"
import { ProductService } from "../../../services/ProductService"
import { useNavigate, useParams } from "react-router-dom"

function EditProductForm() {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const { id } = useParams()
  const navigation = useNavigate()

  // Load product detail
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id)
        /// ---- SET IMAGES ----
        const formattedImages = data.imageData?.map((img) => ({
          uid: img.id.toString(),
          name: `image-${img.id}.png`,
          url: `data:image/png;base64,${img.data}`,
        }))
        /// ---- SET FORM DATA ----
        form.setFieldsValue({
          name: data.name,
          note: data.note,
          detail: data.detail,
          category: data.categoryId,

          colors: data.colors?.map((c) => ({
            name: c.name,
            price: c.price,
          })),

          memories: data.memories?.map((m) => m.id),
          associates: data.associates?.map((a) => a.id),
          images: formattedImages,
        })

        setImages(formattedImages)
      } catch (error) {
        message.error("Không thể tải dữ liệu sản phẩm")
      } finally {
        setLoadingProduct(false)
      }
    }

    fetchProduct()
  }, [id])

  const next = async () => {
    try {
      await form.validateFields()
      setCurrent((prev) => prev + 1)
    } catch {
      message.error("Vui lòng điền đầy đủ thông tin!")
    }
  }

  const prev = () => setCurrent((prev) => prev - 1)

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result.split(",")[1])
      reader.onerror = (err) => reject(err)
    })

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const values = await form.validateFields()

      /// ---- PROCESS IMAGES ----
      const imgPromises = images.map(async (img) => {
        if (img.originFileObj) {
          const base64 = await convertToBase64(img.originFileObj)
          return { data: base64 }
        }
        return { data: img.url.split(",")[1] }
      })

      const processedImages = await Promise.all(imgPromises)

      /// ---- PAYLOAD ----
      const payload = {
        id: id,
        name: values.name,
        note: values.note,
        detail: values.detail,
        categoryId: values.category,
        associateIds: values.associates || [],
        memoryIds: values.memories || [],
        images: processedImages,
        colorCreateRequest: values.colors?.map((c) => ({
          name: c.name,
          price: parseFloat(c.price),
        })),
      }

      await ProductService.editProduct(payload)

      message.success("Cập nhật sản phẩm thành công!")
      navigation("/admin/product")
    } catch (error) {
      console.log(error)
      message.error(error.message || "Cập nhật thất bại!")
    } finally {
      setLoading(false)
    }
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

  if (loadingProduct) {
    return (
      <div style={{ textAlign: "center", padding: 30 }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Card title="Chỉnh sửa sản phẩm">
      <Steps
        current={current}
        items={steps.map((s) => ({ title: s.title }))}
        style={{ marginBottom: 24 }}
      />

      <Form layout="vertical" form={form}>
        {/* {steps[current].content} */}
        <Form form={form} layout="vertical">
          <div style={{ display: current === 0 ? "block" : "none" }}>
            <Step1BasicInfo form={form} images={images} setImages={setImages} />
          </div>

          <div style={{ display: current === 1 ? "block" : "none" }}>
            <Step2Config form={form} />
          </div>

          <div style={{ display: current === 2 ? "block" : "none" }}>
            <Step3Associates form={form} />
          </div>
        </Form>

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
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              Cập nhật
            </Button>
          )}
        </div>
      </Form>
    </Card>
  )
}

export default EditProductForm
