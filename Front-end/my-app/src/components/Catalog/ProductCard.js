import { Button, Card } from "antd"
import styles from "./catalog.module.css"

const ProductCard = ({ image, title, price }) => {
  return (
    <Card
      className={styles.productCard}
      cover={<img src={image} alt={title} />}
    >
      <h4>{title}</h4>
      <span style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
        ${price}
      </span>
      <Button type="primary" block>
        Buy Now
      </Button>
    </Card>
  )
}

export default ProductCard
