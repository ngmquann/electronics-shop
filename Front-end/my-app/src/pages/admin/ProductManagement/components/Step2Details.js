import { Checkbox, Form, Input, Space, Typography } from "antd"
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"

const { Title } = Typography

function Step2Config() {
  const memoryOptions = [
    { id: 1, name: "128GB", price: 0 },
    { id: 2, name: "256GB", price: 1000000 },
    { id: 3, name: "512GB", price: 2000000 },
  ]

  return (
    <>
      <Title level={5}>Màu sắc</Title>
      <Form.List name="colors">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Space
                key={key}
                align="baseline"
                style={{ marginBottom: 8, marginRight: 8 }}
              >
                <Form.Item
                  name={[name, "name"]}
                  rules={[{ required: true, message: "Nhập tên màu" }]}
                >
                  <Input placeholder="Tên màu (VD: Đen, Trắng...)" />
                </Form.Item>
                <Form.Item
                  name={[name, "price"]}
                  rules={[{ required: true, message: "Nhập giá" }]}
                >
                  <Input placeholder="Giá (VNĐ)" type="number" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
                <PlusCircleOutlined onClick={() => add()} />
              </Space>
            ))}
            {/* <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()}>
              Thêm màu mới
            </Button> */}
          </>
        )}
      </Form.List>

      <Title level={5} style={{ marginTop: 24 }}>
        Bộ nhớ
      </Title>
      <Form.Item
        name="memories"
        rules={[{ required: true, message: "Chọn ít nhất một bộ nhớ" }]}
      >
        <Checkbox.Group style={{ gap: 6 }}>
          {memoryOptions.map((item) => (
            <Checkbox key={item.id} value={item.id}>
              {item.name}{" "}
              {item.price > 0 && (
                <span style={{ color: "#888" }}>
                  (+{item.price.toLocaleString("vi-VN")}₫)
                </span>
              )}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </>
  )
}

export default Step2Config
