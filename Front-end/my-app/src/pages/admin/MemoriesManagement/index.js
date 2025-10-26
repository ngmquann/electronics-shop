import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Space } from "antd"
import Title from "antd/es/typography/Title"
import { useRef } from "react"
import MemoryTable from "./components/MemoriesTable"

function MemoriesManagement() {
  const tableRef = useRef()
  return (
    <Card
      title={
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            Quản lý bộ nhớ
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
      <MemoryTable ref={tableRef} />
    </Card>
  )
}

export default MemoriesManagement
