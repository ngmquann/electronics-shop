import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Space } from "antd"
import Title from "antd/es/typography/Title"
import CategoryTable from "./components/CategoryTable"
import { useRef } from "react"

function CategoryManagement() {
  const tableRef = useRef()

  return (
    <Card
      title={
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            Quản lý danh mục
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => tableRef.current?.openAddForm()}
          >
            Thêm mới
          </Button>
        </Space>
      }
    >
      <CategoryTable ref={tableRef}/>
    </Card>
  )
}

export default CategoryManagement
