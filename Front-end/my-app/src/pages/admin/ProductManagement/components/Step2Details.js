import { Checkbox, Form, Input, Space, Typography, Spin, message } from "antd"
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { MemoryService } from "../../../../services/MemoryService"

const { Title } = Typography

function Step2Config() {
  const [memoryOptions, setMemoryOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const fetchMemories = async () => {
      setLoading(true)
      try {
        const memories = await MemoryService.getAllMemory()
        setMemoryOptions(memories)
      } catch (error) {
        messageApi.error(error.message || "Không thể tải danh sách bộ nhớ")
      } finally {
        setLoading(false)
      }
    }

    fetchMemories()
  }, [])

  return (
    <>
      {contextHolder}
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
          </>
        )}
      </Form.List>

      <Title level={5} style={{ marginTop: 24 }}>
        Bộ nhớ
      </Title>
      {loading ? (
        <Spin />
      ) : (
        <Form.Item
          name="memories"
          rules={[{ required: true, message: "Chọn ít nhất một bộ nhớ" }]}
        >
          <Checkbox.Group style={{ gap: 6 }}>
            {memoryOptions.map((item) => (
              <Checkbox key={item.id} value={item.id}>
                {item.name}{" "}
                <span style={{ color: "#888" }}>
                  ({item.price.toLocaleString("vi-VN")}₫)
                </span>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      )}
    </>
  )
}

export default Step2Config
