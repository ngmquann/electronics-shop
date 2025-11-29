import React from "react"
import { Row, Col, Typography, Tag, Card, Divider } from "antd"

const { Title, Paragraph } = Typography

const BlogDetail = () => {
  const blog = {
    id: 1,
    title: "Top 5 Laptop Gaming Đáng Mua 2025",
    date: "28/11/2025",
    category: "laptop",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    content: `
      Laptop gaming năm 2025 tập trung vào hiệu năng mạnh mẽ, tản nhiệt tốt và thiết kế nhẹ hơn.
      Dưới đây là top 5 mẫu laptop đáng mua nhất cho game thủ:

      1. ASUS ROG Strix 2025
      - CPU Intel Gen 14
      - GPU RTX 5070
      - Màn hình 240Hz

      2. Acer Predator Helios Neo
      - Giá tốt
      - Tản nhiệt mạnh
      - Thiết kế gaming hiện đại

      3. MSI Raider 2025
      - Build cao cấp
      - Màn hình mini-LED
      - Phù hợp streamer & đồ họa

      Đây là những lựa chọn tốt nhất cho game thủ muốn hiệu năng cao và độ ổn định lâu dài.
    `,
  }

  const relatedBlogs = [
    {
      id: 2,
      title: "Cách Chọn Điện Thoại Phù Hợp Nhu Cầu",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      id: 3,
      title: "Phụ Kiện Công Nghệ Hot 2025",
      img: "https://images.unsplash.com/photo-1587202372775-a7d4766921a9",
    },
  ]

  return (
    <div style={{ padding: "40px 80px" }}>
      <Row gutter={50}>
        {/* Content */}
        <Col span={16}>
          <img
            src={blog.img}
            alt={blog.title}
            style={{
              width: "100%",
              borderRadius: 12,
              marginBottom: 30,
              maxHeight: 450,
              objectFit: "cover",
            }}
          />

          <Tag color="blue">{blog.category}</Tag>
          <Title level={2} style={{ marginTop: 20 }}>
            {blog.title}
          </Title>
          <Paragraph type="secondary">{blog.date}</Paragraph>

          <Paragraph
            style={{ fontSize: 16, lineHeight: 1.7, whiteSpace: "pre-line" }}
          >
            {blog.content}
          </Paragraph>

          <Divider />

          <Paragraph strong>Xem thêm:</Paragraph>
          {relatedBlogs.map((r) => (
            <Card
              key={r.id}
              hoverable
              style={{ marginBottom: 20 }}
              onClick={() => (window.location.href = `/blog/${r.id}`)}
            >
              <Row gutter={20}>
                <Col span={8}>
                  <img
                    src={r.img}
                    alt={r.title}
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      height: 120,
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col span={16}>
                  <Title level={4}>{r.title}</Title>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>

        {/* Sidebar */}
        <Col span={8}>
          <Title level={3}>Bài viết liên quan</Title>
          {relatedBlogs.map((r) => (
            <Card
              key={r.id}
              hoverable
              style={{ marginBottom: 20 }}
              onClick={() => (window.location.href = `/blog/${r.id}`)}
            >
              <img
                src={r.img}
                alt={r.title}
                style={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <Title level={4} style={{ marginTop: 10 }}>
                {r.title}
              </Title>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default BlogDetail
