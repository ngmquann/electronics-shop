import React from "react"
import { Row, Col, Card, Typography, Avatar, Statistic, Divider } from "antd"
import {
  ThunderboltOutlined,
  SmileOutlined,
  TrophyOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CustomerServiceOutlined,
  StarOutlined,
} from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography

const AboutUs = () => {
  return (
    <div style={{ padding: "40px 80px" }}>
      {/* Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1f1c2c, #928dab)",
          padding: "70px 40px",
          borderRadius: 16,
          textAlign: "center",
          marginBottom: 60,
          color: "#fff",
        }}
      >
        <Title style={{ color: "#fff", marginBottom: 20 }}>Về Chúng Tôi</Title>
        <Paragraph style={{ fontSize: 18, color: "#f0f0f0" }}>
          Hệ thống thương mại điện tử chuyên cung cấp các sản phẩm điện tử chất
          lượng cao – uy tín – giá tốt.
        </Paragraph>
      </div>

      {/* Thông tin công ty */}
      <Row gutter={40}>
        <Col span={12}>
          <Title level={2}>Giới thiệu</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Chúng tôi là một trong những nền tảng thương mại điện tử hàng đầu về
            thiết bị điện tử: điện thoại, laptop, PC, phụ kiện công nghệ… Với
            mục tiêu mang lại giá trị, chất lượng và trải nghiệm tốt nhất cho
            khách hàng.
          </Paragraph>
          <Paragraph style={{ fontSize: 16 }}>
            Thành lập năm 2025, website đã phục vụ hơn <b>200.000 khách hàng</b>{" "}
            toàn quốc.
          </Paragraph>
        </Col>
        <Col span={12}>
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3"
            alt="About us"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </Col>
      </Row>

      <Divider style={{ marginTop: 60 }} />

      {/* Mission - Vision - Values */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        Sứ Mệnh – Tầm Nhìn – Giá Trị
      </Title>

      <Row gutter={30}>
        <Col span={8}>
          <Card style={{ textAlign: "center", padding: 20 }}>
            <ThunderboltOutlined style={{ fontSize: 40, color: "#ff4d4f" }} />
            <Title level={4}>Sứ Mệnh</Title>
            <Paragraph>
              Mang công nghệ hiện đại đến mọi khách hàng với giá tốt nhất.
            </Paragraph>
          </Card>
        </Col>

        <Col span={8}>
          <Card style={{ textAlign: "center", padding: 20 }}>
            <TrophyOutlined style={{ fontSize: 40, color: "#faad14" }} />
            <Title level={4}>Tầm Nhìn</Title>
            <Paragraph>
              Trở thành nền tảng thương mại điện tử điện tử hàng đầu Đông Nam Á.
            </Paragraph>
          </Card>
        </Col>

        <Col span={8}>
          <Card style={{ textAlign: "center", padding: 20 }}>
            <SmileOutlined style={{ fontSize: 40, color: "#52c41a" }} />
            <Title level={4}>Giá Trị Cốt Lõi</Title>
            <Paragraph>
              Chất lượng – Uy tín – Khách hàng là trung tâm.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider style={{ marginTop: 60 }} />

      {/* Statistics */}
      <Row gutter={40} justify="center" style={{ marginTop: 40 }}>
        <Col span={6}>
          <Statistic
            title="Khách hàng"
            value={200000}
            prefix={<TeamOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Sản phẩm"
            value={3500}
            prefix={<CheckCircleOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Đánh giá 5★"
            value={15000}
            prefix={<StarOutlined />}
          />
        </Col>
      </Row>

      <Divider style={{ marginTop: 60 }} />

      {/* Team */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        Đội Ngũ Phát Triển
      </Title>

      <Row gutter={30} justify="center">
        {[
          {
            name: "Nguyễn Minh Quân",
            role: "CEO",
            img: "https://i.pravatar.cc/150?img=12",
          },
          {
            name: "Trần Chung Kiên",
            role: "CTO",
            img: "https://i.pravatar.cc/150?img=32",
          },
          {
            name: "Nguyễn Đình Nam",
            role: "Designer",
            img: "https://i.pravatar.cc/150?img=47",
          },
        ].map((item) => (
          <Col span={6} key={item.name}>
            <Card style={{ textAlign: "center", padding: 20 }}>
              <Avatar size={100} src={item.img} />
              <Title level={4} style={{ marginTop: 20 }}>
                {item.name}
              </Title>
              <Text type="secondary">{item.role}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider style={{ marginTop: 60 }} />

      {/* Why choose us */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        Lý Do Chọn Chúng Tôi
      </Title>

      <Row gutter={30}>
        <Col span={8}>
          <Card>
            <CustomerServiceOutlined style={{ fontSize: 36 }} />
            <Title level={4}>Hỗ trợ 24/7</Title>
            <Paragraph>Đội ngũ hỗ trợ luôn sẵn sàng giải đáp.</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <CheckCircleOutlined style={{ fontSize: 36 }} />
            <Title level={4}>Sản phẩm chính hãng</Title>
            <Paragraph>Cam kết 100% chính hãng, bảo hành minh bạch.</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <TrophyOutlined style={{ fontSize: 36 }} />
            <Title level={4}>Giá tốt hàng đầu</Title>
            <Paragraph>Cạnh tranh thị trường, nhiều ưu đãi hấp dẫn.</Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AboutUs
