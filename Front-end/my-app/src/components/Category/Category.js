import { useNavigate } from "react-router-dom"

function CategoryItem({ icon, label }) {
  const navigate = useNavigate()
  return (
    <div
      style={{
        width: "160px",
        height: "128px",
        borderRadius: "15px",
        backgroundColor: "#EDEDED",
        // padding: "24px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => navigate("/catalog")}
    >
      <div style={{ fontSize: "48px", width: "48px", height: "48px" }}>
        {icon}
      </div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "500",
          marginTop: "8px",
          marginBottom: "0",
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  )
}

export default CategoryItem
