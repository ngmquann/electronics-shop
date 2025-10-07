import React, { useState } from "react"
import { FaTruck, FaStore, FaShieldAlt, FaHeart } from "react-icons/fa"
import { FiHeart } from "react-icons/fi"
import IconText from "./IconText"

const ProductInfo = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedStorage, setSelectedStorage] = useState(null)
  const [wishlist, setWishlist] = useState(false)

  return (
    <div className="product-info">
      <h1>{product.name}</h1>

      <p className="price">
        <span className="new-price">${product.newPrice}</span>
        <span className="old-price">${product.oldPrice}</span>
      </p>

      {/* Màu sắc */}
      <div className="colors">
        <p>Select color:</p>
        {product.colors.map((color) => (
          <button
            key={color}
            className={`color ${color} ${
              selectedColor === color ? "active" : ""
            }`}
            onClick={() => setSelectedColor(color)}
          ></button>
        ))}
      </div>

      {/* Bộ nhớ */}
      <div className="storage">
        {product.storages.map((s) => (
          <button
            key={s}
            className={selectedStorage === s ? "active" : ""}
            onClick={() => setSelectedStorage(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ⚡ Thông tin nhanh */}
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

      {/* Mô tả ngắn */}
      <p className="short-des">
        {product.shortDesc} <span className="more">more...</span>
      </p>

      {/* Hành động */}
      <div className="actions">
        <button
          className="add-wishlist"
          onClick={() => setWishlist((prev) => !prev)}
        >
          {wishlist ? <FaHeart color="red" /> : <FiHeart />} Wishlist
        </button>
        <button className="add-cart">Add to Cart</button>
      </div>

      {/* Extra Info */}
      <ul className="extra-info">
        <IconText icon={<FaTruck />} title="Free Delivery" value="1-2 days" />
        <IconText icon={<FaStore />} title="In Stock" value="Today" />
        <IconText icon={<FaShieldAlt />} title="Guaranteed" value="1 year" />
      </ul>
    </div>
  )
}

export default ProductInfo
