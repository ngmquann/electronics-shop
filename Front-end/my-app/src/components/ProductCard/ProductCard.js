import React, { useState } from "react"
import { FiHeart } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"
import "./ProductCard.css"
import { useNavigate } from "react-router-dom"
import favoriteApi from "../../api/favoriteApi"
import { message } from "antd"

const ProductCard = ({ favorite, id, images, name, price }) => {
  const navigate = useNavigate()

  const [liked, setLiked] = useState(favorite)
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const handleToggleFavorite = async (e) => {
    e.stopPropagation()

    setLoading(true)
    try {
      const res = await favoriteApi.toggleFavorite(id)
      console.log(res)
      setLiked(!liked)
    } catch (error) {
      messageApi.error("Không thể cập nhật yêu thích")
    } finally {
      setLoading(false)
    }
  }

  const imageSrc = images
    ? `data:image/jpeg;base64,${images}`
    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <>
      {contextHolder}

      <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
        <div className="wishlist" onClick={handleToggleFavorite}>
          {liked ? <FaHeart color="red" /> : <FiHeart />}
        </div>

        <img src={imageSrc} alt={name} />

        <div className="product-information">
          <div className="product-name">{name}</div>
          <div className="price-product">{formatPrice(price)}</div>
        </div>

        <button className="buy-btn">Buy Now</button>
      </div>
    </>
  )
}

export default ProductCard
