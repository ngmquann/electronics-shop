import React from "react"
import { Radio, Button, DatePicker, Space, Card } from "antd"
import StepProgress from "../../../components/Checkout/StepProgress"
import "./Step2Shipping.css"

const Step2Shipping = ({
  onNext,
  onBack,
  shippingMethod,
  setShippingMethod,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(null)

  const shippingOptions = [
    {
      value: "free",
      title: "Miễn phí",
      description: "Giao hàng tiêu chuẩn",
      date: "5-7 ngày làm việc",
      price: 0,
    },
  ]

  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value)
  }

  return (
    <div className="step-container">
      <StepProgress currentStep={1} />

      <div className="content-wrapper">
        <h3>Phương thức vận chuyển</h3>

        <Radio.Group
          value={shippingMethod}
          onChange={handleShippingChange}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size={12}>
            {shippingOptions.map((option) => (
              <Card
                key={option.value}
                className={`shipping-option ${
                  shippingMethod === option.value ? "active" : ""
                }`}
                bodyStyle={{ padding: "12px 16px" }}
              >
                <div className="shipping-content">
                  <Radio value={option.value}>
                    <div className="shipping-info">
                      <strong>{option.title}</strong>
                      <span className="shipping-desc">
                        {option.description}
                      </span>
                    </div>
                  </Radio>

                  {option.value === "schedule" &&
                  shippingMethod === "schedule" ? (
                    <DatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                      format="DD MMM, YYYY"
                      className="date-picker"
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <span className="shipping-date">{option.date}</span>
                      {option.price > 0 && (
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#d32f2f",
                          }}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(option.price)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </Space>
        </Radio.Group>

        <div className="button-group">
          <Button size="large" onClick={onBack} className="btn-back">
            Quay lại
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={onNext}
            className="btn-next"
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step2Shipping
