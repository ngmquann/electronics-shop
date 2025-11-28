import React, { useEffect, useState } from "react"
import { Button, Image, message, Spin } from "antd"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { CartService } from "../../../services/CartService"
import { useNavigate } from "react-router-dom"

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingItems, setUpdatingItems] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchCartData()
  }, [])

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const data = await CartService.getCartByUser()
      setCartItems(data)
    } catch (error) {
      message.error("Không thể tải giỏ hàng")
      console.error("Error fetching cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id)
    if (!item) return

    const newQuantity = item.quantity + delta
    if (newQuantity < 1) return

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )

    setUpdatingItems((prev) => ({ ...prev, [id]: true }))

    try {
      await CartService.changeQuantity(id, newQuantity)
      message.success("Đã cập nhật số lượng")
    } catch (error) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - delta } : item
        )
      )
      message.error("Không thể cập nhật số lượng")
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [id]: false }))
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getItemPrice = (item) => item.product.colors?.[0]?.price || 0

  // Total tiền trực tiếp
  const total = cartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  )

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div
      style={{
        fontFamily: '"Inter", sans-serif',
        backgroundColor: "#f5f5f5",
        padding: "30px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          border: "1px solid #e5e5e5",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          Giỏ hàng của bạn ({cartItems.length} sản phẩm)
        </h2>

        {cartItems.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#777" }}>
            Giỏ hàng đang trống
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 0",
                  borderBottom: "1px solid #f0f0f0",
                  opacity: updatingItems[item.id] ? 0.5 : 1,
                  transition: "0.2s",
                }}
              >
                {/* Ảnh + info */}
                <div style={{ display: "flex", gap: "16px", flex: 1 }}>
                  <Image
                    src={`data:image/jpeg;base64,${item.product.imageData[0].data}`}
                    width={70}
                    height={70}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "15px", fontWeight: 500 }}>
                      {item.product.name}
                    </span>
                    <span style={{ fontSize: "13px", color: "#777" }}>
                      {item.product.categoryName}
                    </span>
                    {item.product.colors?.[0] && (
                      <span style={{ fontSize: "13px", color: "#777" }}>
                        Màu: {item.product.colors[0].name}
                      </span>
                    )}
                    {item.product.memories?.[0] && (
                      <span style={{ fontSize: "13px", color: "#777" }}>
                        Bộ nhớ: {item.product.memories[0].name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Button
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1 || updatingItems[item.id]}
                  />
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {item.quantity}
                  </div>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={updatingItems[item.id]}
                  />
                </div>

                {/* Giá */}
                <div
                  style={{
                    minWidth: "110px",
                    textAlign: "right",
                    color: "#d32f2f",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  {formatPrice(getItemPrice(item))}
                </div>
              </div>
            ))}

            {/* Tổng tiền */}
            <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "2px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              <span>Tổng tiền</span>
              <span style={{ color: "#d32f2f" }}>{formatPrice(total)}</span>
            </div>

            <Button
              type="primary"
              block
              style={{
                marginTop: "25px",
                padding: "18px",
                fontSize: "16px",
                fontWeight: 600,
                background: "#000",
                border: "none",
                borderRadius: "8px",
              }}
              onClick={() => navigate("/checkout")}
            >
              Tiếp tục thanh toán
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShoppingCart
