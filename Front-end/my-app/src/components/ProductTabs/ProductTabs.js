import React, { useState } from "react"
import { Tabs } from "antd"
import ProductGrid from "../ProductGrid/ProductGrid"

const { TabPane } = Tabs

const ProductTabs = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Apple iPhone 14 Pro Max 128GB Deep Purple",
      price: 900,
      image:
        "https://sieuviet.vn/hm_content/uploads/anh-san-pham/apple/iphone/iphone-14/iPhone_14_Pro_128GB_Deep_Purple.png",
      liked: false,
    },
    {
      id: 2,
      name: "Blackmagic Pocket Cinema Camera 6k",
      price: 2535,
      image:
        "https://cdn.vjshop.vn/may-quay-phim/blackmagic-design-pocket-cinema-camera-6k/blackmagic-design-pocket-cinema-camera-6k-05.jpg",
      liked: false,
    },
    {
      id: 3,
      name: "Apple Watch Series 9 GPS 41mm",
      price: 399,
      image:
        "https://cdn2.cellphones.com.vn/x/media/catalog/product/a/p/apple_watch_series_9_41mm_gps_vi_n_nh_m_d_y_v_i_1_.png",
      liked: false,
    },
    {
      id: 4,
      name: "AirPods Max Silver",
      price: 549,
      image:
        "https://cgaxisimages.fra1.cdn.digitaloceanspaces.com/2021/11/airpods_max_silver_a.webp",
      liked: false,
    },
    {
      id: 5,
      name: "Samsung Galaxy Watch6 Classic 47mm",
      price: 369,
      image:
        "https://cdn.tgdd.vn/Products/Images/7077/310858/samsung-galaxy-watch6-classic-47mm-bac-1-750x500.png",
      liked: false,
    },
    {
      id: 6,
      name: "Galaxy Z Fold5 Unlocked 256GB",
      price: 1799,
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/hk_en/2307/gallery/hk-en-galaxy-z-fold5-f946-sm-f9460lbdtgy-537152766?$684_547_PNG$",
      liked: true,
    },
    {
      id: 7,
      name: "Galaxy Buds FE Graphite",
      price: 99.99,
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/vn/sm-r400nzaaxxv/gallery/vn-galaxy-buds-fe-sm-r400nzaaxxv-538394932?$684_547_PNG$",
      liked: false,
    },
    {
      id: 8,
      name: "Apple iPad 9 10.2'' 64GB Wi-Fi",
      price: 398,
      image:
        "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111898_sp849-ipad-9gen-480.png",
      liked: false,
    },
  ])

  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="New Arrival" key="1">
        <ProductGrid products={products} />
      </TabPane>
      <TabPane tab="Bestseller" key="2">
        <p>Coming soon...</p>
      </TabPane>
      <TabPane tab="Featured Products" key="3">
        <p>Coming soon...</p>
      </TabPane>
    </Tabs>
  )
}

export default ProductTabs
