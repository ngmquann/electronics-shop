import "./App.css"
import { jwtDecode } from "jwt-decode"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CommonWeb from "./layouts/web/CommonWeb"
import Home from "./pages/web/Home/Home"
import ProductDetail from "./pages/web/ProductDetail/ProductDetail"

function App() {
  const token = localStorage.getItem("jwtToken")
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
          <Route path="product-detail" element={<ProductDetail />} />
          {/*   <Route path="booking" element={<Booking />} />
            <Route path="profile" element={<Profile />} /> */}
        </Route>
        {/* <Route
            path="/admin/*"
            element={isAdmin ? <CommonAdmin /> : <Navigate to="/" />}
          >
            <Route path="flight" element={<FlightComponent />} />
            <Route path="flight/create" element={<FlightDetail />} />
            <Route path="airport" element={<AirportComponent />} />
            <Route path="airline" element={<AirlineComponent />} />
            <Route path="plane" element={<PlaneComponent />} />
            <Route path="dashboard" element={<DashboardComponent />} />
          </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
