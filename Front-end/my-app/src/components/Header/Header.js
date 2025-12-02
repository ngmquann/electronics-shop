import logo from "../../assets/images/logo_vector_black.svg"
import { SearchOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Input, Spin } from "antd"
import { FiUser } from "react-icons/fi"
import { GrFavorite } from "react-icons/gr"
import { PiShoppingCart } from "react-icons/pi"
import "./Header.css"
import { useLocation, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { MdAccountCircle } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import { clearAuth } from "../../utils/storage"
import { IoMdKey } from "react-icons/io"
import { CiDeliveryTruck } from "react-icons/ci"
import { useEffect, useState, useRef } from "react"
import { AuthService } from "../../services/AuthService"

function Header() {
  const [avatar, setAvatar] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const debounceTimeout = useRef(null)

  const navigation = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("access_token")
  
  const SEARCH_API_URL = "http://localhost:8081/api/product/search"

  let userData
  let isAdmin = false
  let isLogin = false

  if (token) {
    isLogin = true
    userData = jwtDecode(token)
    isAdmin = userData.role === "ADMIN"
  }

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about-us" },
    { label: "Contact Us", path: "/contact" },
    { label: "Blog", path: "/blog" },
  ]

  const itemDropdownForUser = [
    {
      key: "0",
      label: (
        <span onClick={() => navigation("/update-info-user")}>
          Cập nhật thông tin
        </span>
      ),
      icon: <MdAccountCircle />,
    },
    {
      key: "1",
      label: (
        <span onClick={() => navigation("/change-password")}>Đổi mật khẩu</span>
      ),
      icon: <IoMdKey />,
    },
    {
      key: "2",
      label: (
        <span onClick={() => navigation("/order-tracking")}>
          Theo dõi đơn hàng
        </span>
      ),
      icon: <CiDeliveryTruck />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <a
          rel="noopener noreferrer"
          href="/"
          onClick={() => {
            clearAuth()
          }}
        >
          Đăng xuất
        </a>
      ),
      icon: <IoLogOut />,
    },
  ]

  const itemDropdownForAdmin = [
    {
      key: "0",
      label: (
        <a rel="noopener noreferrer" href="/admin">
          Dashboard
        </a>
      ),
      icon: <MdAccountCircle />,
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          href="/"
          onClick={() => {
            clearAuth()
          }}
        >
          Đăng xuất
        </a>
      ),
      icon: <IoLogOut />,
    },
  ]

  const isActive = (path) => location.pathname === path

  // Call API tìm kiếm
const searchProducts = async (keyword) => {
  if (!keyword.trim()) {
    setSearchResults([])
    setShowResults(false)
    return
  }

  setIsSearching(true)
  try {
    const params = new URLSearchParams({ name: keyword })
    const response = await fetch(`${SEARCH_API_URL}?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const products = await response.json() 

    console.log("Search API result:", products)

    if (products.length > 0) {
      const top5 = products.slice(0, 5)
      setSearchResults(top5)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  } catch (error) {
    console.error("Search API Error:", error)
    setSearchResults([])
    setShowResults(false)
  } finally {
    setIsSearching(false)
  }
}


  // Xử lý thay đổi input với debounce
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)

    // Clear timeout cũ
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    // Set timeout mới - call API sau 300ms
    debounceTimeout.current = setTimeout(() => {
      searchProducts(value)
    }, 300)
  }

  // Xử lý click vào sản phẩm
  const handleProductClick = (productId) => {
    navigation(`/product/${productId}`)
    setSearchValue("")
    setSearchResults([])
    setShowResults(false)
  }

  // Xử lý click bên ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (token) {
      AuthService.getInfoUser().then((res) => {
        setAvatar(res.image)
      })
    }
  }, [])

  // Cleanup debounce timeout
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  return (
    <div className="header">
      <div className="logo">
        <img alt="Logo" src={logo} onClick={() => navigation("/")} />
      </div>
      <div className="search" ref={searchRef} style={{ position: "relative" }}>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="icon-search" />}
          suffix={isSearching ? <Spin size="small" /> : null}
          className="input-search"
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => {
            if (searchResults.length > 0) {
              setShowResults(true)
            }
          }}
        />

        {/* Dropdown kết quả tìm kiếm */}
        {showResults && searchResults.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              marginTop: "8px",
              maxHeight: "400px",
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            {searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white"
                }}
              >
                {/* Hình ảnh sản phẩm */}
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    flexShrink: 0,
                  }}
                >
                  {product.images ? (
                    <img
                      src={`data:image/png;base64,${product.images}`}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.parentElement.innerHTML = "📦"
                        e.target.parentElement.style.display = "flex"
                        e.target.parentElement.style.alignItems = "center"
                        e.target.parentElement.style.justifyContent = "center"
                        e.target.parentElement.style.fontSize = "24px"
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                        fontSize: "24px",
                      }}
                    >
                      📦
                    </div>
                  )}
                </div>

                {/* Thông tin sản phẩm */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: "500",
                      color: "#333",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </div>
                  {product.categoryName && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "4px",
                      }}
                    >
                      {product.categoryName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="right-section">
        <div className="navigation">
          {navigationItems.map((item) => (
            <p
              key={item.path}
              className={`navigation-item ${
                isActive(item.path) ? "active" : "unactive"
              }`}
              onClick={() => navigation(item.path)}
            >
              {item.label}
            </p>
          ))}
        </div>
        <div className="list-icon">
         <GrFavorite 
            className="icon-item" 
            onClick={() => navigation("/favorite")}
            style={{ cursor: "pointer" }}
            title="Danh sách yêu thích"
          />
          <PiShoppingCart
            className="icon-item"
            onClick={() => navigation("/cart")}
          />
          {isLogin ? (
            <Dropdown
              menu={{
                items: isAdmin ? itemDropdownForAdmin : itemDropdownForUser,
              }}
              placement="bottom"
              arrow
            >
              <Avatar
                src={
                  <img
                    draggable={false}
                    src={
                      avatar ||
                      "https://i.pinimg.com/736x/89/30/3f/89303fd48d31b02666805986a792c36c.jpg"
                    }
                    alt="avatar"
                  />
                }
              />
            </Dropdown>
          ) : (
            <FiUser
              className="icon-item"
              onClick={() => navigation("/login")}
              style={{ cursor: "pointer" }}
              title="Go to Login"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header