import { useEffect, useState } from "react"
import { Column, Pie } from "@ant-design/charts"
import { ArrowUpOutlined, FilterOutlined } from "@ant-design/icons"
import {
  Avatar,
  Card,
  Col,
  List,
  Row,
  Statistic,
  Table,
  Tag,
  Select,
  Spin,
  message,
} from "antd"
import { DashboardService } from "../../../services/DashboardService"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  const [summary, setSummary] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    products: 0,
  })

  const [revenueTrend, setRevenueTrend] = useState([])
  const [categoryChart, setCategoryChart] = useState([])
  const [recentOrders, setRecentOrders] = useState([])

  const [orderFilter, setOrderFilter] = useState("ALL")

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const data = await DashboardService.getDashboardData()
      console.log(data)

      // const data = res.data;

      // --- SUMMARY ---
      setSummary({
        revenue: data.revenues.reduce((sum, e) => sum + e.total, 0),
        orders: data.orderTotal,
        users: data.userTotal,
        products: data.productTotal,
      })

      // --- REVENUE TREND ---
      setRevenueTrend(
        data.revenues.map((r) => ({
          date: r.date,
          value: r.total,
        }))
      )

      // --- CATEGORIES ---
      setCategoryChart(
        data.categoryRates.map((c) => ({
          type: c.name,
          value: c.percent,
        }))
      )

      // --- RECENT ORDERS ---
      setRecentOrders(
        data.orderResponses.map((o) => ({
          id: "DH" + o.id,
          user: o.user.fullName,
          total: o.total,
          status: o.statusMethodDelivery,
        }))
      )
    } catch (err) {
      message.error("Không thể tải Dashboard!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const orderColumns = [
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
      render: (s) => {
        const colorMap = {
          PENDING: "gold",
          SHIPPING: "blue",
          COMPLETED: "green",
          CANCELED: "red",
        }

        const labelMap = {
          PENDING: "Đang xử lý",
          SHIPPING: "Đang giao",
          COMPLETED: "Hoàn thành",
          CANCELED: "Đã hủy",
        }

        return <Tag color={colorMap[s]}>{labelMap[s]}</Tag>
      },
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

  const filteredOrders =
    orderFilter === "ALL"
      ? recentOrders
      : recentOrders.filter((o) => o.status === orderFilter)

  if (loading)
    return <Spin size="large" style={{ marginTop: 100, width: "100%" }} />

  return (
    <div style={{ padding: "24px" }}>
      {/* --- KPIs --- */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
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
          <Card title="Doanh thu theo ngày">
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
              dataSource={[
                {
                  name: "iPhone 15 Pro Max",
                  sold: 350,
                  img: "https://via.placeholder.com/60",
                },
                {
                  name: "AirPods Pro 2",
                  sold: 280,
                  img: "https://via.placeholder.com/60",
                },
                {
                  name: "Samsung S24 Ultra",
                  sold: 240,
                  img: "https://via.placeholder.com/60",
                },
              ]}
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
          <Card
            title="Đơn hàng gần đây"
            extra={
              <Select
                defaultValue="ALL"
                onChange={setOrderFilter}
                style={{ width: 180 }}
              >
                <Select.Option value="ALL">Tất cả</Select.Option>
                <Select.Option value="PENDING">Đang xử lý</Select.Option>
                <Select.Option value="SHIPPING">Đang giao</Select.Option>
                <Select.Option value="COMPLETED">Hoàn thành</Select.Option>
                <Select.Option value="CANCELED">Đã hủy</Select.Option>
              </Select>
            }
          >
            <Table
              columns={orderColumns}
              dataSource={filteredOrders}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
