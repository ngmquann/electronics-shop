import BreadcrumbsBar from "../../../components/Catalog/BreadcrumbsBar"
import styles from "../../../components/Catalog/catalog.module.css"
import ProductGrid from "../../../components/Catalog/ProductGrid"
import SidebarFilter from "../../../components/Catalog/SidebarFilter"

const CatalogPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <BreadcrumbsBar />
      <main className={styles.container}>
        <SidebarFilter />
        <ProductGrid />
      </main>
    </div>
  )
}

export default CatalogPage
