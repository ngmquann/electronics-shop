import { Column, Pie } from "@ant-design/charts"
import { ArrowUpOutlined } from "@ant-design/icons"
import { Avatar, Card, Col, List, Row, Statistic, Table, Tag } from "antd"

export default function Dashboard() {
  // Fake data (sau này gọi API từ Spring)
  const summary = {
    revenue: 125000000,
    orders: 320,
    users: 1500,
    products: 860,
  }

  const revenueTrend = [
    { date: "01/11", value: 12 },
    { date: "05/11", value: 22 },
    { date: "10/11", value: 18 },
    { date: "15/11", value: 35 },
    { date: "20/11", value: 42 },
    { date: "23/11", value: 38 },
  ]

  const categoryChart = [
    { type: "Điện thoại", value: 45 },
    { type: "Tai nghe", value: 25 },
    { type: "Laptop", value: 15 },
    { type: "Tablet", value: 10 },
    { type: "Phụ kiện", value: 5 },
  ]

  const topProducts = [
    {
      name: "iPhone 15 Pro Max",
      sold: 350,
      img: "https://via.placeholder.com/60",
    },
    { name: "AirPods Pro 2", sold: 280, img: "https://via.placeholder.com/60" },
    {
      name: "Samsung S24 Ultra",
      sold: 240,
      img: "https://via.placeholder.com/60",
    },
  ]

  const recentOrders = [
    { id: "DH001", user: "Nguyễn Văn A", total: 12000000, status: "PAID" },
    { id: "DH002", user: "Trần Thị B", total: 3500000, status: "PENDING" },
    { id: "DH003", user: "Phạm Minh C", total: 8900000, status: "PAID" },
  ]

  const columns = [
    { title: "Mã đơn", dataIndex: "id" },
    { title: "Khách hàng", dataIndex: "user" },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (v) => v.toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (s) => (
        <Tag color={s === "PAID" ? "green" : "orange"}>
          {s === "PAID" ? "Đã thanh toán" : "Chờ xử lý"}
        </Tag>
      ),
    },
  ]

  const revenueConfig = {
    data: revenueTrend,
    xField: "date",
    yField: "value",
    smooth: true,
    height: 300,
    autoFit: true,
  }

  const categoryConfig = {
    data: categoryChart,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: false,
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* --- KPIs --- */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Doanh thu tháng"
              value={summary.revenue}
              suffix="đ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Đơn hàng"
              value={summary.orders}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Người dùng" value={summary.users} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Sản phẩm" value={summary.products} />
          </Card>
        </Col>
      </Row>

      {/* --- Charts --- */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={16}>
          <Card title="Doanh thu 30 ngày">
            <Column {...revenueConfig} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Phân bố danh mục">
            <Pie {...categoryConfig} />
          </Card>
        </Col>
      </Row>

      {/* --- Top Products + Orders --- */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={10}>
          <Card title="Sản phẩm bán chạy">
            <List
              itemLayout="horizontal"
              dataSource={topProducts}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.img} shape="square" />}
                    title={item.name}
                    description={`Đã bán: ${item.sold}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={14}>
          <Card title="Đơn hàng gần đây">
            <Table
              columns={columns}
              dataSource={recentOrders}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
