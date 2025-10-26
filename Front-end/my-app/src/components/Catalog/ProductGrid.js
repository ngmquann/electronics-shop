import ProductCard from "./ProductCard"
import styles from "./catalog.module.css"

const products = [
  {
    title: "iPhone 14 Pro 512GB Gold",
    image:
      "https://product.hstatic.net/1000259254/product/iphone_14_pro_gold_e1e1339f03974f21a38feb67d8ad768c_master.jpg",
    price: 1247,
  },
  {
    title: "Apple iPhone 13 Pro Max 256GB",
    image:
      "https://cdn.xtmobile.vn/vnt_upload/product/07_2023/thumbs/600_iphone_13_pro_128gb_xanh_5.jpg",
    price: 1020,
  },
  {
    title: "Apple iPhone 13 128GB",
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/240675769.png",
    price: 880,
  },
  {
    title: "Apple iPhone 14 256GB",
    image:
      "https://cdn.tgdd.vn/Products/Images/42/289663/iPhone-14-plus-thumb-xanh-600x600.jpg",
    price: 960,
  },
  {
    title: "Apple iPhone 14 Plus 256GB",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/318/659/products/iphone-14-128gb-mau-do-didongviet-6b0c227b-a0df-4aae-aab9-dad0369f3835-8befec9b-33af-443d-a6bc-99990680344d-f06328cc-8d42-415b-8f8e-6584d6280669.jpg",
    price: 1120,
  },
  {
    title: "Apple iPhone 12 Pro 128GB",
    image:
      "https://cdn.tgdd.vn/Products/Images/42/213032/iphone-12-pro-xanh-duong-new-600x600-2-600x600.jpg",
    price: 780,
  },
]

const ProductGrid = () => {
  return (
    <section className={styles.products}>
      {products.map((p) => (
        <ProductCard key={p.title} {...p} />
      ))}
    </section>
  )
}

export default ProductGrid
