function CategoryItem({ icon, label }) {
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
        }}
      >
        {label}
      </p>
    </div>
  )
}

export default CategoryItem
