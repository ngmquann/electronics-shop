import logo from "../../assets/images/logo_vector_black.svg"
import { SearchOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Input } from "antd"
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
import { useEffect, useState } from "react"
import { AuthService } from "../../services/AuthService"

function Header() {
  const [avatar, setAvatar] = useState(null)
  const navigation = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("access_token")
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
    { label: "About", path: "/about" },
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

  useEffect(() => {
    if (token) {
      AuthService.getInfoUser().then((res) => {
        setAvatar(res.image)
      })
    }
  }, [])

  return (
    <div className="header">
      <div className="logo">
        <img alt="Logo" src={logo} onClick={() => navigation("/")} />
      </div>
      <div className="search">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="icon-search" />}
          className="input-search"
        />
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
          <GrFavorite className="icon-item" />
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
