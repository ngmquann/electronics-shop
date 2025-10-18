import { useState } from "react";
import { BASE_URL } from "../api";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const payWithVnpay = async () => {
    setLoading(true);
    setMsg("");
    try {
      // payload mẫu — tùy BE của bạn
      const payload = {
        total: 15990000,
        methodPayment: "CASH_ON_DELIVERY",          
        methodDelivery: "EXPRESS",
        address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
        returnUrl: `${window.location.origin}/payment/result`
      };
     const res = await fetch(`${BASE_URL}/api/payment/create_payment_vnpay`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImZ1bGxOYW1lIjoiVHJhbiBjaHVuZyBraWVuIiwidXNlcklkIjozLCJzdWIiOiIyMjUxMTIwMDIzQHV0LmVkdS52biIsImlhdCI6MTc2MDgwMDI5MSwiZXhwIjoxNzYzMzkyMjkxfQ._JahoJCujv51KTZbMzSX0qflg2iksRqn4d_QUTXjDfo`   
        },
        body: JSON.stringify(payload)
        });
      if (!res.ok) throw new Error(await res.text());
      const paymentUrl = await res.text(); // hoặc res.json().paymentUrl tùy BE
      window.location.href = paymentUrl;   // chuyển sang trang thanh toán VNPay
    } catch (e) {
      setMsg(e.message || "Lỗi tạo thanh toán");
      setLoading(false);
    }
  };


  return (
    <div style={{maxWidth: 520, margin: "60px auto", fontFamily: "system-ui"}}>
      <h2>Thanh toán đơn hàng (demo)</h2>
      <p>Tổng tiền: <b>15.990.000 đ</b></p>

      <button disabled={loading} onClick={payWithVnpay} style={{padding: "10px 16px", marginRight: 12}}>
        {loading ? "Đang tạo thanh toán..." : "Thanh toán VNPay"}
      </button>


      {msg && <p style={{color:"crimson", marginTop: 12}}>{msg}</p>}
    </div>
  );
}
