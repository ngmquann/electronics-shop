import { Avatar, Dropdown, Layout, Menu } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import { Outlet, useNavigate } from "react-router-dom"
import logo from "../../assets/images/logo_vector_white.svg"
import { FaBox, FaChartPie, FaHome, FaUser } from "react-icons/fa"
import { MdKey } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import { FaBagShopping, FaFloppyDisk, FaMicrochip } from "react-icons/fa6"
import { TbCategoryPlus } from "react-icons/tb"
import { clearAuth } from "../../utils/storage"

const { Sider } = Layout

function getItem(label, key, icon, children) {
  return { key, icon, children, label }
}

const items = [
  getItem("Dashboard", "/dashboard", <FaChartPie />),
  getItem("Quản lý người dùng", "/user", <FaUser />),
  getItem("Quản lý danh mục", "/category", <TbCategoryPlus />),
  getItem("Quản lý linh kiện", "/accessories", <FaMicrochip />),
  getItem("Quản lý bộ nhớ", "/memories", <FaFloppyDisk />),
  getItem("Quản lý sản phẩm", "/product", <FaBox />),
  getItem("Quản lý đơn hàng", "/order", <FaBagShopping />),
]

const itemDropdown = [
  {
    key: "0",
    label: (
      <a rel="noopener noreferrer" href="/">
        Trang chủ
      </a>
    ),
    icon: <FaHome />,
  },
  {
    key: "1",
    label: (
      <a rel="noopener noreferrer" href="/">
        Đổi mật khẩu
      </a>
    ),
    icon: <MdKey />,
  },
  {
    type: "divider",
  },
  {
    key: "2",
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

function CommonAdmin() {
  const navigate = useNavigate()

  const handleMenuClick = ({ key }) => {
    navigate(`/admin${key}`)
  }

  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#000",
    backgroundColor: "#fff",
  }

  const layoutStyle = {
    minHeight: "100vh",
  }

  return (
    <Layout style={layoutStyle}>
      <Layout>
        <Sider
          width="15%"
          collapsible
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div
            className="demo-logo"
            style={{ textAlign: "center", margin: "16px" }}
          >
            <img src={logo} style={{ width: "60px" }} alt="Logo" />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["/admin/dashboard"]}
            onClick={handleMenuClick}
            mode="inline"
            items={items}
          />
        </Sider>
        <Content style={contentStyle}>
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              background: "linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0 24px",
              height: 64,
            }}
          >
            <Dropdown menu={{ items: itemDropdown }} placement="bottom" arrow>
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
          </Header>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default CommonAdmin
