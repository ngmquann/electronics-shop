import "./App.css"
import { jwtDecode } from "jwt-decode"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import CommonWeb from "./layouts/web/CommonWeb"
import Home from "./pages/web/Home/Home"
import ProductDetail from "./pages/web/ProductDetail/ProductDetail"
import CommonAdmin from "./layouts/admin/CommonAdmin"
import UserManagement from "./pages/admin/UserManagement"
import UserForm from "./pages/admin/UserManagement/UserForm"
import CategoryManagement from "./pages/admin/CategoryManagement"
import ProductManagement from "./pages/admin/ProductManagement"
import ProductForm from "./pages/admin/ProductManagement/ProductForm"
import MemoriesManagement from "./pages/admin/MemoriesManagement"
import AccessoriesManagement from "./pages/admin/AccessoryManagement"
import LoginPage from "./pages/web/Auth/LoginPage"
import SignupPage from "./pages/web/Auth/SignupPage"
import CatalogPage from "./pages/web/Catalog/CatalogPage"
import OrderManagement from "./pages/admin/OrderManagement"
import OrderDetail from "./pages/admin/OrderManagement/OrderDetail"
import EditProductForm from "./pages/admin/ProductManagement/EditProductForm"
import ContactPage from "./pages/web/Contact/ContactPage"
import Dashboard from "./pages/admin/Dashboard"

function App() {
  const token = localStorage.getItem("access_token")
  let userData
  let isAdmin = false

  if (token) {
    userData = jwtDecode(token)
    isAdmin = userData.role === "ADMIN"
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CommonWeb />}>
          <Route path="" element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route
          path="/admin/*"
          element={isAdmin ? <CommonAdmin /> : <Navigate to="/" />}
        >
          <Route path="" element={<Dashboard />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="user/add" element={<UserForm />} />
          <Route path="user/edit/:id" element={<UserForm />} />
          <Route path="category" element={<CategoryManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="product/add" element={<ProductForm />} />
          <Route path="product/edit/:id" element={<EditProductForm />} />
          <Route path="memories" element={<MemoriesManagement />} />
          <Route path="accessories" element={<AccessoriesManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="order/:id" element={<OrderDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
