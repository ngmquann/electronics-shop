import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";
import PaymentResult from "./pages/PaymentResult";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/payment/result" element={<PaymentResult />} />
      </Routes>
    </BrowserRouter>
  );
}
