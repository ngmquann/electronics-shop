import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Upload,
  Button,
  message,
  Spin,
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { CategoryService } from "../../../../services/CategoryService"

function Step1BasicInfo({ form, images, setImages }) {
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const categories = await CategoryService.getAllCategories()
        setCategory(categories)
      } catch (error) {
        messageApi.error(error.message || "Không thể tải danh sách danh mục")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleImageChange = (info) => {
    setImages(info.fileList)
  }

  const handleRemoveImage = (uid) => {
    setImages(images.filter((img) => img.uid !== uid))
  }

  return (
    <>
      {contextHolder}
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Mô tả chi tiết" name="detail">
            <TextArea rows={4} placeholder="Nhập mô tả chi tiết..." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Ghi chú" name="note">
            <TextArea rows={4} placeholder="Nhập ghi chú sản phẩm..." />
          </Form.Item>
        </Col>
      </Row>

      {loading ? (
        <Spin />
      ) : (
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          {/* <Select options={category} placeholder="Chọn danh mục sản phẩm" /> */}
          <Select placeholder="Chọn danh mục sản phẩm">
            {category.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        label="Hình ảnh sản phẩm"
        name="images"
        rules={[
          { required: true, message: "Vui lòng tải lên ít nhất 1 hình ảnh" },
        ]}
      >
        <Upload
          listType="picture"
          multiple
          fileList={images}
          beforeUpload={() => false}
          onChange={handleImageChange}
          onRemove={handleRemoveImage}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
        </Upload>
      </Form.Item>
    </>
  )
}

export default Step1BasicInfo
