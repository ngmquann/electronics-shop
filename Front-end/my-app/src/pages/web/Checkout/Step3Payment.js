import { Button, Card, Divider, Image, Spin } from "antd"
import { BankOutlined } from "@ant-design/icons"
import StepProgress from "../../../components/Checkout/StepProgress"
import VNPayImg from "../../../assets/images/Logo-VNPAY-QR-1.webp"
import "./Step3Payment.css"

const Step3Payment = ({
  onBack,
  onPay,
  cartItems,
  selectedAddress,
  shippingMethod,
  loading,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getItemPrice = (item) => {
    return item.product.colors?.[0]?.price || 0
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const shipping = shippingMethod === "express" ? 50000 : 0
  const total = subtotal + tax + shipping

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="step-container">
      <StepProgress currentStep={2} />

      <div className="checkout-container">
        {/* Summary Section */}
        <Card className="summary-card">
          <h3>Tóm tắt đơn hàng</h3>

          <div className="items-list">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="item-card"
                bodyStyle={{ padding: 10 }}
              >
                <div className="item-content">
                  <Image
                    src={`data:image/jpeg;base64,${item.product.imageData[0].data}`}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    preview={false}
                  />
                  <div className="item-details">
                    <p className="item-name">{item.product.name}</p>
                    <span className="item-quantity">
                      Số lượng: {item.quantity}
                    </span>
                    <span className="item-price">
                      {formatPrice(getItemPrice(item))}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="info-section">
            <div className="info-item">
              <p className="info-label">Địa chỉ giao hàng</p>
              <p className="info-value">
                {selectedAddress ? (
                  <>
                    {selectedAddress.name} - {selectedAddress.phone}
                    <br />
                    {selectedAddress.address}, {selectedAddress.city},{" "}
                    {selectedAddress.state} {selectedAddress.zipCode}
                  </>
                ) : (
                  "Chưa chọn địa chỉ"
                )}
              </p>
            </div>

            <div className="info-item">
              <p className="info-label">Phương thức vận chuyển</p>
              <p className="info-value">
                {shippingMethod === "free"
                  ? "Miễn phí (5-7 ngày)"
                  : "Nhanh (2-3 ngày)"}
              </p>
            </div>
          </div>

          <Divider />

          <div className="price-details">
            <div className="price-row">
              <span>Tạm tính:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="price-row">
              <span>Thuế (10%):</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="price-row">
              <span>Phí vận chuyển:</span>
              <span>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
            </div>
            <Divider style={{ margin: "12px 0" }} />
            <div className="price-row total">
              <span>Tổng cộng:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Section */}
        <div className="payment-section">
          <h3>Thanh toán</h3>

          <Card className="payment-card-vnpay" bodyStyle={{ padding: "24px" }}>
            <div className="payment-header">
              <BankOutlined style={{ fontSize: 24 }} />
              <strong style={{ fontSize: 18, marginLeft: 12 }}>VNPay</strong>
            </div>

            <Divider style={{ margin: "16px 0" }} />

            <div className="payment-content-vnpay">
              <p style={{ marginBottom: 16, color: "#666" }}>
                Thanh toán qua cổng VNPay — quét mã QR để hoàn tất giao dịch.
              </p>
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <Image
                  src={VNPayImg}
                  alt="VNPay QR"
                  width={150}
                  preview={false}
                  style={{ marginTop: 10 }}
                />
              </div>
            </div>
          </Card>

          <div className="payment-actions">
            <Button size="large" onClick={onBack} className="btn-back">
              Quay lại
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={onPay}
              className="btn-next"
            >
              Thanh toán {formatPrice(total)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Payment
