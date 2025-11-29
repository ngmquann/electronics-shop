// import { Input, Checkbox, Collapse } from "antd"
// import styles from "./catalog.module.css"

// const brands = [
//   { label: "Apple", count: 110 },
//   { label: "Samsung", count: 125 },
//   { label: "Xiaomi", count: 68 },
//   { label: "Poco", count: 44 },
//   { label: "OPPO", count: 36 },
//   { label: "Honor", count: 10 },
//   { label: "Motorola", count: 34 },
//   { label: "Nokia", count: 22 },
//   { label: "Realme", count: 35 },
// ]

// const SidebarFilter = () => {
//   return (
//     <aside className={styles.sidebar}>
//       <div style={{ marginBottom: 16 }}>
//         <h3>Brand</h3>
//         <Input placeholder="Search" style={{ marginBottom: 10 }} />
//         {brands.map((b) => (
//           <div
//             key={b.label}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: 4,
//             }}
//           >
//             <Checkbox>{b.label}</Checkbox>
//             <span style={{ color: "#999" }}>{b.count}</span>
//           </div>
//         ))}
//       </div>

//       <Collapse
//         accordion
//         items={[
//           { key: "1", label: "Battery capacity" },
//           { key: "2", label: "Screen type" },
//           { key: "3", label: "Screen diagonal" },
//           { key: "4", label: "Protection class" },
//           { key: "5", label: "Built-in memory" },
//         ]}
//       />
//     </aside>
//   )
// }

// export default SidebarFilter
import { Input, Checkbox, Collapse } from "antd"
import { useState, useEffect } from "react"
import styles from "./catalog.module.css"

const brands = [
  { label: "Apple", value: "Apple" },
  { label: "Samsung", value: "Samsung" },
  { label: "Xiaomi", value: "Xiaomi" },
  { label: "Poco", value: "Poco" },
  { label: "OPPO", value: "OPPO" },
  { label: "Honor", value: "Honor" },
  { label: "Motorola", value: "Motorola" },
  { label: "Nokia", value: "Nokia" },
  { label: "Realme", value: "Realme" },
]

const SidebarFilter = ({ onFilterChange, selectedBrands = [] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBrands, setFilteredBrands] = useState(brands)

  useEffect(() => {
    const filtered = brands.filter((b) =>
      b.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredBrands(filtered)
  }, [searchTerm])

  const handleBrandChange = (checkedValues) => {
    onFilterChange({ brands: checkedValues })
  }

  return (
    <aside className={styles.sidebar}>
      <div style={{ marginBottom: 16 }}>
        <h3>Brand</h3>
        <Input
          placeholder="Search"
          style={{ marginBottom: 10 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Checkbox.Group
          value={selectedBrands}
          onChange={handleBrandChange}
          style={{ width: "100%" }}
        >
          {filteredBrands.map((b) => (
            <div
              key={b.value}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <Checkbox value={b.value}>{b.label}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </div>

      <Collapse
        accordion
        items={[
          { key: "1", label: "Battery capacity" },
          { key: "2", label: "Screen type" },
          { key: "3", label: "Screen diagonal" },
          { key: "4", label: "Protection class" },
          { key: "5", label: "Built-in memory" },
        ]}
      />
    </aside>
  )
}

export default SidebarFilter
