import React, { useState, useEffect } from "react"
import { FaTruck, FaStore, FaShieldAlt, FaHeart } from "react-icons/fa"
import { FiHeart } from "react-icons/fi"
import IconText from "./IconText"
import { CartService } from "../../../../services/CartService"
import { message } from "antd"

const ProductInfo = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedStorage, setSelectedStorage] = useState(null)
  const [wishlist, setWishlist] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(product.newPrice)
  const [messageApi, contextHolder] = message.useMessage()

  // Set giá trị mặc định khi component mount
  useEffect(() => {
    if (product.colors?.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0].id)
    }
    if (product.storages?.length > 0 && !selectedStorage) {
      setSelectedStorage(product.storages[0].id)
    }
  }, [product])

  // Cập nhật giá khi chọn storage hoặc color
  useEffect(() => {
    calculatePrice()
  }, [selectedStorage, selectedColor])

  const calculatePrice = () => {
    let price = 0

    // Giá từ storage
    const storage = product.storages?.find((s) => s.id === selectedStorage)
    if (storage) {
      price += storage.price
    }

    // Giá từ color (nếu có)
    const color = product.colors?.find((c) => c.id === selectedColor)
    if (color && color.price) {
      price += color.price
    }

    setCurrentPrice(price || product.newPrice)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <>
      {contextHolder}
      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="price">
          <span className="new-price">{formatPrice(currentPrice)}</span>
          {/* {product.oldPrice && (
            <span className="old-price">{formatPrice(product.oldPrice)}</span>
          )} */}
        </p>

        {/* Màu sắc */}
        {product.colors?.length > 0 && (
          <div className="colors">
            <p>Select color:</p>
            {product.colors.map((color) => (
              <button
                key={color.id}
                className={`color ${color.name} ${
                  selectedColor === color.id ? "active" : ""
                }`}
                onClick={() => setSelectedColor(color.id)}
                style={{ backgroundColor: color.name }}
                title={color.name}
              ></button>
            ))}
          </div>
        )}

        {/* Bộ nhớ */}
        {product.storages?.length > 0 && (
          <div className="storage">
            {product.storages.map((s) => (
              <button
                key={s.id}
                className={selectedStorage === s.id ? "active" : ""}
                onClick={() => setSelectedStorage(s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Thông tin nhanh */}
        {product.quickInfo?.length > 0 && (
          <ul className="quick-info">
            {product.quickInfo.map((info, index) => (
              <li key={index}>
                <div className="icon">{info.icon}</div>
                <div className="text">
                  <span className="spec">{info.label}</span>
                  <span className="value">{info.value}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Mô tả ngắn */}
        {product.shortDesc && (
          <p className="short-des">
            {product.shortDesc}
            {/* <span className="more">more...</span> */}
          </p>
        )}

        {/* Hành động */}
        <div className="actions">
          <button
            className="add-wishlist"
            onClick={() => setWishlist((prev) => !prev)}
          >
            {wishlist ? <FaHeart color="red" /> : <FiHeart />} Wishlist
          </button>
          <button
            className="add-cart"
            onClick={async () => {
              console.log(`selectedColor: ${selectedColor}`)
              console.log(`selectedStorage: ${selectedStorage}`)

              try {
                await CartService.addCart(
                  1,
                  product.id,
                  selectedColor,
                  selectedStorage
                )
                messageApi.success({
                  content: "Add to cart successfully",
                  key: "loading",
                  duration: 3,
                })
              } catch (error) {
                messageApi.error({
                  content: error.message || "Không thể tải thông tin sản phẩm",
                  key: "loading",
                  duration: 3,
                })
              }
            }}
          >
            Add to Cart
          </button>
        </div>

        {/* Extra Info */}
        <ul className="extra-info">
          <IconText icon={<FaTruck />} title="Free Delivery" value="1-2 days" />
          <IconText icon={<FaStore />} title="In Stock" value="Today" />
          <IconText icon={<FaShieldAlt />} title="Guaranteed" value="1 year" />
        </ul>
      </div>
    </>
  )
}

export default ProductInfo
