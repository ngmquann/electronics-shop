import { useState, useEffect } from "react"
import { Button, Empty, Spin, message } from "antd"
import { HeartOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import ProductGrid from "../../../components/ProductGrid/ProductGrid"
import "../../../assets/css/FavoritePage.css"

function FavoritePage() {
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem("access_token")

  const FAVORITE_API_URL = "http://localhost:8081/api/favorite/by-user"
  
  const fetchFavoriteProducts = async () => {
    if (!token) {
      message.warning("Vui lòng đăng nhập để xem danh sách yêu thích")
      navigate("/login")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(FAVORITE_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setFavoriteProducts(data)
      } else {
        message.error("Không thể tải danh sách yêu thích")
      }
    } catch (error) {
      console.error("Error fetching favorites:", error)
      message.error("Đã có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavoriteProducts()
  }, [])

  if (loading) {
    return (
      <div className="favorite-page">
        <div className="favorite-loading">
          <Spin size="large" tip="Đang tải danh sách yêu thích..." />
        </div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="favorite-page">
        <div className="favorite-empty-container">
          <div className="favorite-empty-content">
            <div className="empty-icon">
              <HeartOutlined />
            </div>
            <h1 className="empty-title">Danh sách yêu thích trống</h1>
            <p className="empty-description">
              Bạn chưa có sản phẩm yêu thích nào. Hãy khám phá và thêm những sản phẩm bạn thích vào danh sách!
            </p>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate("/")}
              className="explore-btn"
            >
              Khám phá ngay
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="favorite-page">
      <div className="favorite-container">
        <div className="favorite-header">
          <div className="header-content">
            <div className="header-icon">
              <HeartOutlined />
            </div>
            <div className="header-text">
              <h1 className="favorite-title">Sản phẩm yêu thích</h1>
              <p className="favorite-subtitle">
                {favoriteProducts.length} sản phẩm trong danh sách của bạn
              </p>
            </div>
          </div>
        </div>

        <div className="favorite-content">
          <ProductGrid products={favoriteProducts} />
        </div>
      </div>
    </div>
  )
}

export default FavoritePage