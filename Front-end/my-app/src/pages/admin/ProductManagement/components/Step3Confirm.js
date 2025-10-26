import { Form, Space, Typography, Checkbox } from "antd"
import { FaIcons } from "react-icons/fa"

const { Title } = Typography

function Step3Associates() {
  const associateData = [
    { id: 1, name: "12MP", type: "Camera", logo: "FaCamera" },
    { id: 2, name: "5000mAh", type: "Pin", logo: "FaBatteryFull" },
    { id: 3, name: "Snapdragon 8 Gen 2", type: "Chip", logo: "FaMicrochip" },
  ]

  return (
    <>
      <Title level={5}>Linh kiện (Associates)</Title>
      <Form.Item
        name="associates"
        rules={[{ required: true, message: "Chọn ít nhất một linh kiện" }]}
      >
        <Checkbox.Group style={{ gap: 6 }}>
          {associateData.map((item) => {
            const IconComponent = FaIcons[item.logo] || null
            return (
              <Checkbox key={item.id} value={item.id}>
                <Space>
                  {IconComponent && <IconComponent />}
                  <span>
                    {item.type}: {item.name}
                  </span>
                </Space>
              </Checkbox>
            )
          })}
        </Checkbox.Group>
      </Form.Item>
    </>
  )
}

export default Step3Associates
