import { Breadcrumb, Select } from "antd"
import styles from "./catalog.module.css"

const BreadcrumbsBar = () => {
  return (
    <div className={styles.breadcrumbs}>
      <Breadcrumb
        items={[
          { title: "Home" },
          { title: "Catalog" },
          { title: "Smartphones" },
        ]}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span>Selected Products: 85</span>
        <Select
          defaultValue="By rating"
          options={[
            { value: "rating", label: "By rating" },
            { value: "price", label: "By price" },
            { value: "name", label: "By name" },
          ]}
        />
      </div>
    </div>
  )
}

export default BreadcrumbsBar
