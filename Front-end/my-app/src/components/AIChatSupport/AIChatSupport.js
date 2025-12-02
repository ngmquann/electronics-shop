import { useState, useRef, useEffect } from "react"
import { MessageOutlined, CloseOutlined, SendOutlined } from "@ant-design/icons"
import { Input, Button, Card, Avatar, Spin } from "antd"

function AIChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Xin chào! Bạn cần tìm gì? Tôi có thể giúp bạn tìm kiếm sản phẩm.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  
  const API_URL = "http://localhost:8081/api/ai/question"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
    
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: currentInput,
        }),
      })

      const data = await response.json()

      let botResponse = {
        type: "bot",
        text: "",
        items: null,
        itemType: null,
        timestamp: new Date(),
      }

      if (data.code === 200) {
        botResponse.text = data.type
        botResponse.items = data.aiProductResponse
        botResponse.itemType = data.message // "category" hoặc "product"
      } else {
        botResponse.text = data.type || "Xin lỗi, tôi chưa hiểu rõ yêu cầu của bạn."
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("API Error:", error)
      const errorResponse = {
        type: "bot",
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleItemClick = (item, itemType) => {
    if (itemType === "product") {
      window.location.href = `/product/${item.id}`
    } else if (itemType === "category") {
      window.location.href = `/catalog/${item.id}`
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <MessageOutlined style={{ fontSize: "28px", color: "white" }} />
        </div>
      )}

      {/* Chat Box */}
      {isOpen && (
        <Card
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "400px",
            height: "600px",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          bodyStyle={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Avatar
                style={{ backgroundColor: "#fff", color: "#667eea" }}
                icon={<MessageOutlined />}
              />
              <div>
                <div style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
                  AI Hỗ Trợ
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
                  Trực tuyến
                </div>
              </div>
            </div>
            <CloseOutlined
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: "18px",
                color: "white",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              backgroundColor: "#f5f5f5",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      backgroundColor: msg.type === "user" ? "#667eea" : "white",
                      color: msg.type === "user" ? "white" : "#333",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {msg.text}
                  </div>

                  {/* Product/Category List */}
                  {msg.items && (
                    <div style={{ marginTop: "12px" }}>
                      {msg.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item, msg.itemType)}
                          style={{
                            backgroundColor: "white",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            transition: "transform 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "translateX(4px)")
                          }
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                        >
                          {/* Hiển thị icon hoặc hình ảnh */}
                          <div style={{ fontSize: "32px", minWidth: "40px" }}>
                            {msg.itemType === "category" ? (
                              // lấy ra icon của category
                              <span>📁</span>
                            ) : item.image ? (
                              // Base64 image cho product
                              <img
                                src={`data:image/png;base64,${item.image}`}
                                alt={item.name}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                                onError={(e) => {
                                  e.target.style.display = "none"
                                  e.target.parentElement.innerHTML = "📦"
                                }}
                              />
                            ) : (
                              <span>📦</span>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "500", color: "#333" }}>
                              {item.name}
                            </div>
                            {item.categoryName && (
                              <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
                                {item.categoryName}
                              </div>
                            )}
                            {item.description && (
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "#666",
                                  marginTop: "4px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginTop: "4px",
                      textAlign: msg.type === "user" ? "right" : "left",
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Avatar
                  size="small"
                  style={{ backgroundColor: "#667eea" }}
                  icon={<MessageOutlined />}
                />
                <Spin size="small" />
                <span style={{ color: "#999", fontSize: "14px" }}>Đang trả lời...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "white",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <Input
                placeholder="Nhập câu hỏi của bạn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  flex: 1,
                  borderRadius: "20px",
                }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
              />
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

export default AIChatSupport