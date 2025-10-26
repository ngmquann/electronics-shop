import { Form, Input, Row, Col, Select, Upload, Button, Space } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"

const categoryOptions = [
  { label: "Điện thoại", value: 1 },
  { label: "Laptop", value: 2 },
  { label: "Máy tính bảng", value: 3 },
]

function Step1BasicInfo({ form, images, setImages }) {
  return (
    <>
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

      <Form.Item
        label="Danh mục"
        name="category"
        rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
      >
        <Select
          options={categoryOptions}
          placeholder="Chọn danh mục sản phẩm"
        />
      </Form.Item>

      <Form.Item label="Hình ảnh sản phẩm" name="images">
        <Upload
          listType="picture"
          multiple
          beforeUpload={() => false}
          onChange={(info) => {
            const files = info.fileList.map((f) => ({
              uid: f.uid,
              name: f.name,
              url: URL.createObjectURL(f.originFileObj),
            }))
            setImages(files)
          }}
        >
          <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
        </Upload>

        <Space wrap style={{ marginTop: 12 }}>
          {images.map((img) => (
            <img
              key={img.uid}
              src={img.url}
              alt={img.name}
              width={80}
              style={{
                borderRadius: 8,
                border: "1px solid #ddd",
                objectFit: "cover",
              }}
            />
          ))}
        </Space>
      </Form.Item>
    </>
  )
}

export default Step1BasicInfo
