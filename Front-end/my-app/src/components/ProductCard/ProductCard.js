// import React, { useState } from "react"
// import { Card, Button } from "antd"
// import { HeartOutlined, HeartFilled } from "@ant-design/icons"
// import Title from "antd/es/typography/Title"
// import { useNavigate } from "react-router-dom"

// const { Meta } = Card

// const ProductCard = ({ image, name, price, liked }) => {
//   const [isLiked, setIsLiked] = useState(liked)
//   const navigate = useNavigate()

//   return (
//     <Card
//       hoverable
//       onClick={() => navigate("/product-detail")}
//       cover={
//         <img
//           alt={name}
//           src={image}
//           style={{ height: 150, objectFit: "contain", padding: "1rem 0" }}
//         />
//       }
//       style={{
//         borderRadius: 12,
//         backgroundColor: "#F6F6F6",
//         height: "420px",
//         cursor: "pointer",
//       }}
//       extra={[
//         isLiked ? (
//           <HeartFilled
//             key="liked"
//             style={{ color: "red" }}
//             onClick={() => setIsLiked(false)}
//           />
//         ) : (
//           <HeartOutlined key="like" onClick={() => setIsLiked(true)} />
//         ),
//       ]}
//     >
//       <p
//         style={{
//           fontSize: "16px",
//           fontWeight: "500",
//           textAlign: "center",
//           margin: 0,
//         }}
//       >
//         {name}
//       </p>
//       <p
//         style={{
//           fontSize: "24px",
//           fontWeight: "600",
//           textAlign: "center",
//           margin: 0,
//         }}
//       >
//         ${price}
//       </p>
//       <Button
//         type="primary"
//         block
//         style={{ marginTop: 10, background: "black", border: "none" }}
//       >
//         Buy Now
//       </Button>
//     </Card>
//   )
// }

// export default ProductCard

import React, { useState } from "react"
import { FiHeart } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"
import "./ProductCard.css"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ image, name, price }) => {
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  const handleLikeClick = (e) => {
    e.stopPropagation() // tránh trigger navigate
    setLiked(!liked)
  }

  return (
    <div className="product-card" onClick={() => navigate("/product-detail")}>
      <div className="wishlist" onClick={handleLikeClick}>
        {liked ? <FaHeart color="red" /> : <FiHeart />}
      </div>
      <img src={image} alt={name} />
      <div className="product-information">
        <div className="product-name">{name}</div>
        <div className="price-product">${price}</div>
      </div>
      <button className="buy-btn">Buy Now</button>
    </div>
  )
}

export default ProductCard
