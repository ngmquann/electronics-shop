import { Form, Space, Typography, Checkbox, Spin, message } from "antd"
import { useEffect, useState } from "react"
import * as FaIcons from "react-icons/fa"
import * as MdIcons from "react-icons/md"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as BiIcons from "react-icons/bi"
import * as IoIcons from "react-icons/io"
import * as Io5Icons from "react-icons/io5"
import * as RiIcons from "react-icons/ri"
import * as GiIcons from "react-icons/gi"
import * as TbIcons from "react-icons/tb"
import * as LuIcons from "react-icons/lu"
import * as FiIcons from "react-icons/fi"
import * as SlIcons from "react-icons/sl"
import * as CgIcons from "react-icons/cg"
import * as TfiIcons from "react-icons/tfi"
import * as PiIcons from "react-icons/pi"
import * as GoIcons from "react-icons/go"
import * as GoIcons6 from "react-icons/fa6"
import * as CiIcons from "react-icons/ci"
import { AssociateService } from "../../../../services/AssociateService"

const { Title } = Typography

function Step3Associates() {
  const [associateData, setAssociateData] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const allIcons = {
    ...FaIcons,
    ...MdIcons,
    ...AiIcons,
    ...BsIcons,
    ...BiIcons,
    ...IoIcons,
    ...Io5Icons,
    ...RiIcons,
    ...GiIcons,
    ...TbIcons,
    ...LuIcons,
    ...FiIcons,
    ...SlIcons,
    ...CgIcons,
    ...TfiIcons,
    ...PiIcons,
    ...GoIcons,
    ...GoIcons6,
    ...CiIcons,
  }

  const getIconByName = (iconName) => {
    const IconComponent = allIcons[iconName]
    return IconComponent ? <IconComponent size={16} /> : null
  }

  useEffect(() => {
    const fetchAssociates = async () => {
      setLoading(true)
      try {
        const associates = await AssociateService.getAllAssociates()
        setAssociateData(associates)
      } catch (error) {
        messageApi.error(error.message || "Không thể tải danh sách linh kiện")
      } finally {
        setLoading(false)
      }
    }

    fetchAssociates()
  }, [])

  return (
    <>
      {contextHolder}
      <Title level={5}>Linh kiện (Associates)</Title>
      {loading ? (
        <Spin />
      ) : (
        <Form.Item
          name="associates"
          rules={[{ required: true, message: "Chọn ít nhất một linh kiện" }]}
        >
          <Checkbox.Group style={{ gap: 6 }}>
            {associateData.map((item) => {
              const IconComponent = getIconByName(item.logo)
              return (
                <Checkbox key={item.id} value={item.id}>
                  <Space>
                    {IconComponent}
                    <span>
                      {item.type}: {item.name}
                    </span>
                  </Space>
                </Checkbox>
              )
            })}
          </Checkbox.Group>
        </Form.Item>
      )}
    </>
  )
}

export default Step3Associates
