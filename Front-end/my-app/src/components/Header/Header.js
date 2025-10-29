import logo from "../../assets/images/logo_vector_black.svg"
import { SearchOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Input } from "antd"
import { FiUser } from "react-icons/fi"
import { GrFavorite } from "react-icons/gr"
import { PiShoppingCart } from "react-icons/pi"
import "./Header.css"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { MdAccountCircle } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import { clearAuth } from "../../utils/storage"

function Header() {
  const navigation = useNavigate()
  const token = localStorage.getItem("access_token")
  let userData
  let isAdmin = false
  let isLogin = false

  if (token) {
    isLogin = true
    userData = jwtDecode(token)
    isAdmin = userData.role === "ADMIN"
  }

  const itemDropdownForUser = [
    {
      key: "0",
      label: (
        <a rel="noopener noreferrer" href="/">
          Trang cá nhân
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
          <p className="navigation-item">Home</p>
          <p className="navigation-item unactive">About</p>
          <p className="navigation-item unactive">Contact Us</p>
          <p className="navigation-item unactive">Blog</p>
        </div>
        <div className="list-icon">
          <GrFavorite className="icon-item" />
          <PiShoppingCart className="icon-item" />
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
                    src="https://i.pinimg.com/736x/89/30/3f/89303fd48d31b02666805986a792c36c.jpg"
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
