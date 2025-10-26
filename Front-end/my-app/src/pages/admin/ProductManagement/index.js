import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Space } from "antd"
import Title from "antd/es/typography/Title"
import ProductTable from "./components/ProductTable"
import { useNavigate } from "react-router-dom"

function ProductManagement() {
  const navigate = useNavigate()
  const handleAddNew = () => {
    navigate("/admin/product/add")
  }

  return (
    <Card
      title={
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            Quản lý sản phẩm
          </Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Thêm mới
          </Button>
        </Space>
      }
    >
      <ProductTable />
    </Card>
  )
}

export default ProductManagement
