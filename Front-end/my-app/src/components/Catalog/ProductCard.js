import { Button, Card } from "antd"
import styles from "./catalog.module.css"

const ProductCard = ({ images, name, price }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <Card
      className={styles.productCard}
      cover={<img src={`data:image/jpeg;base64,${images}`} alt={name} />}
    >
      <h4>{name}</h4>
      <span style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
        {formatPrice(price)}
      </span>
      <Button type="primary" block>
        Buy Now
      </Button>
    </Card>
  )
}

export default ProductCard
