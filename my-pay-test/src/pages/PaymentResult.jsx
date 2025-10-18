import { useEffect, useState } from "react";
import { BASE_URL } from "../api";

export default function PaymentResult() {
  const [state, setState] = useState({
    loading: true,
    ok: null,
    msg: "",
    order: ""
  });

  useEffect(() => {
    const qs = window.location.search;
    const params = new URLSearchParams(qs);

    // 1) Trường hợp BE redirect 302 về FE với ?status & order (cách bạn đang dùng)
    const status = (params.get("status") || "").toLowerCase();
    const order = params.get("code") || "";

    if (status === "success" || status === "fail" || status === "cod") {
      setState({
        loading: false,
        ok: status === "success" || status === "cod",
        msg:
          status === "cod"
            ? "Đặt hàng COD thành công"
            : status === "success"
            ? "Thanh toán thành công"
            : "Thanh toán thất bại",
        order
      });
      return;
    }

    // 3) Không có gì để hiển thị
    setState({
      loading: false,
      ok: false,
      msg: "Thiếu tham số kết quả thanh toán",
      order: ""
    });
  }, []);

  if (state.loading) return <div style={{ padding: 40 }}>Đang xác thực thanh toán…</div>;

  return (
    <div style={{ maxWidth: 520, margin: "60px auto", fontFamily: "system-ui" }}>
      {state.ok ? (
        <>
          <h2>✅ Thanh toán thành công</h2>
          {state.order && (
            <p>
              Mã đơn: <b>{state.order}</b>
            </p>
          )}
          <p>{state.msg}</p>
          <a href="/">Về trang mua hàng</a>
        </>
      ) : (
        <>
          <h2>❌ Thanh toán thất bại</h2>
          <p>{state.msg}</p>
          <a href="/">Thử lại</a>
        </>
      )}
    </div>
  );
}
