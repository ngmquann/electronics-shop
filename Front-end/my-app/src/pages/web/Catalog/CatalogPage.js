// import { useState, useEffect } from "react"
import { useEffect, useState } from "react"
import BreadcrumbsBar from "../../../components/Catalog/BreadcrumbsBar"
import styles from "../../../components/Catalog/catalog.module.css"
import ProductGrid from "../../../components/Catalog/ProductGrid"
import { ProductService } from "../../../services/ProductService"
import { Spin, message } from "antd"
import { useParams } from "react-router-dom"

const CatalogPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [filters, setFilters] = useState({
    categoryId: id,
    sortBy: "rating",
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await ProductService.getProductByCategory(
        filters.categoryId
      )
      let productList = response.data || response

      productList = sortProducts(productList, filters.sortBy)

      setProducts(productList)
    } catch (error) {
      message.error("Không thể tải danh sách sản phẩm")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const sortProducts = (products, sortBy) => {
    const sorted = [...products]
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price)
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "rating":
      default:
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  return (
    <div className={styles.pageWrapper}>
      <BreadcrumbsBar
        productCount={products.length}
        sortBy={filters.sortBy}
        onSortChange={(sortBy) => handleFilterChange({ sortBy })}
      />

      <main
        className={styles.container}
        style={{ justifyContent: "center" }} // Không có sidebar → căn giữa
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              padding: 50,
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  )
}

export default CatalogPage
