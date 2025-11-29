import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Pagination,
  Select,
  Divider,
} from "antd"
import { useNavigate } from "react-router-dom"

const { Title, Paragraph } = Typography
const { Meta } = Card

const BlogList = () => {
  const [category, setCategory] = useState("all")
  const navigate = useNavigate()

  const blogs = [
    {
      id: 1,
      title: "Top 5 Laptop Gaming Đáng Mua 2025",
      desc: "Danh sách laptop gaming mạnh nhất dành cho game thủ.",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      category: "laptop",
      date: "28/11/2025",
    },
    {
      id: 2,
      title: "Cách Chọn Điện Thoại Phù Hợp Nhu Cầu",
      desc: "Gợi ý chọn smartphone theo túi tiền và mục đích sử dụng.",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      category: "mobile",
      date: "20/11/2025",
    },
    {
      id: 3,
      title: "Phụ Kiện Công Nghệ Hot 2025",
      desc: "Tai nghe, bàn phím, chuột… đang được săn đón.",
      img: "https://images.unsplash.com/photo-1587202372775-a7d4766921a9",
      category: "accessory",
      date: "15/11/2025",
    },
  ]

  const filteredBlogs =
    category === "all" ? blogs : blogs.filter((b) => b.category === category)

  return (
    <div style={{ padding: "40px 80px" }}>
      {/* Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #141e30, #243b55)",
          padding: "70px 40px",
          borderRadius: 16,
          textAlign: "center",
          color: "#fff",
          marginBottom: 50,
        }}
      >
        <Title style={{ color: "#fff" }}>Blog Công Nghệ</Title>
        <Paragraph style={{ color: "#ddd" }}>
          Chia sẻ kiến thức – xu hướng – đánh giá sản phẩm mới nhất.
        </Paragraph>
      </div>

      {/* Filters */}
      <Row justify="end" style={{ marginBottom: 20 }}>
        <Col>
          <Select
            defaultValue="all"
            style={{ width: 180 }}
            onChange={setCategory}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "laptop", label: "Laptop" },
              { value: "mobile", label: "Điện thoại" },
              { value: "accessory", label: "Phụ kiện" },
            ]}
          />
        </Col>
      </Row>

      {/* Blog List */}
      <Row gutter={[24, 24]}>
        {filteredBlogs.map((item) => (
          <Col span={8} key={item.id}>
            <Card
              hoverable
              cover={
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ height: 220, objectFit: "cover" }}
                />
              }
              onClick={() => navigate(`/blog/${item.id}`)}
            >
              <Meta title={item.title} description={item.desc} />
              <Divider />
              <Tag color="blue">{item.category}</Tag>
              <Paragraph type="secondary" style={{ marginTop: 10 }}>
                {item.date}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Row justify="center" style={{ marginTop: 40 }}>
        <Pagination defaultCurrent={1} total={50} />
      </Row>
    </div>
  )
}

export default BlogList
