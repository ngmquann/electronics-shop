import logo from "../../assets/images/logo_vector_black.svg"
import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { FiUser } from "react-icons/fi"
import { GrFavorite } from "react-icons/gr"
import { PiShoppingCart } from "react-icons/pi"
import "./Header.css"
import { useNavigate } from "react-router-dom"

function Header() {
  const navigation = useNavigate()
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
          <FiUser
            className="icon-item"
            onClick={() => navigation("/login")}
            style={{ cursor: "pointer" }}
            title="Go to Login"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
