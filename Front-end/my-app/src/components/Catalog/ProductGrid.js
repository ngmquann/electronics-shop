import ProductCard from "./ProductCard"
import styles from "./catalog.module.css"

const ProductGrid = ({ products }) => {
  return (
    <section className={styles.products}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </section>
  )
}

export default ProductGrid
