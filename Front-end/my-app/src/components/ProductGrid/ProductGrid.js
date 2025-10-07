import React from "react"
import { Row, Col } from "antd"
import ProductCard from "../ProductCard/ProductCard"

const ProductGrid = ({ products }) => {
  return (
    <Row gutter={[16, 16]}>
      {products.map((p) => (
        <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
          <ProductCard {...p} />
        </Col>
      ))}
    </Row>
  )
}

export default ProductGrid
