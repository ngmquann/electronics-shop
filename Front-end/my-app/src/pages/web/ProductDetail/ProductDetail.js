import { useState } from "react"
import "./ProductDetail.css"

import { FaCamera } from "react-icons/fa"
import ProductGrid from "../../../components/ProductGrid/ProductGrid"
import ProductGallery from "./components/ProductGallery"
import ProductInfo from "./components/ProductInfo"
import ProductSpecs from "./components/ProductSpecs"
import { CiMicrochip } from "react-icons/ci"
import { FaMicrochip } from "react-icons/fa6"
import { GiBattery75 } from "react-icons/gi"
import { IoCameraReverse } from "react-icons/io5"
import { MdOutlineScreenshot } from "react-icons/md"

function ProductDetail() {
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
      id: 3,
      name: "Apple Watch Series 9 GPS 41mm",
      price: 399,
      image:
        "https://cdn2.cellphones.com.vn/x/media/catalog/product/a/p/apple_watch_series_9_41mm_gps_vi_n_nh_m_d_y_v_i_1_.png",
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
      id: 8,
      name: "Apple iPad 9 10.2'' 64GB Wi-Fi",
      price: 398,
      image:
        "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111898_sp849-ipad-9gen-480.png",
      liked: false,
    },
  ])

  const product = {
    name: "Apple iPhone 14 Pro Max",
    newPrice: 1399,
    oldPrice: 1499,
    colors: ["black", "purple", "red", "gold", "white"],
    storages: ["128GB", "256GB", "512GB", "1TB"],
    shortDesc:
      "Enhanced capabilities thanks to a 6.7-inch display and long-lasting battery.",

    quickInfo: [
      { icon: <MdOutlineScreenshot />, label: "Screen size", value: '6.7"' },
      { icon: <FaMicrochip />, label: "CPU", value: "Apple A16 Bionic" },
      { icon: <CiMicrochip />, label: "Number of cores", value: "6" },
      { icon: <FaCamera />, label: "Main camera", value: "48-12-12 MP" },
      { icon: <IoCameraReverse />, label: "Front camera", value: "12 MP" },
      { icon: <GiBattery75 />, label: "Battery capacity", value: "4323 mAh" },
    ],
  }

  const specs = {
    description:
      "The iPhone 14 Pro Max features a stunning 6.7-inch OLED display with ProMotion technology.",
    screen: [
      ["Diagonal", '6.7"'],
      ["Resolution", "2796×1290"],
      ["Refresh rate", "120 Hz"],
      ["Pixel density", "460 ppi"],
      ["Type", "OLED"],
    ],
    cpu: [
      ["Chip", "A16 Bionic"],
      ["Cores", "6"],
    ],
  }

  return (
    <div className="container">
      <div className="product-view">
        <ProductGallery
          images={[
            "https://cdn2.cellphones.com.vn/x/media/catalog/product/t/_/t_m_18_1_3_2.png",
            "https://www.themobileshop.ca/static/9ccdc15fd190a400182722310aa7c13e/38156/iPhone_14_Pro_Max_Deep_Purple_Front.png",
            "https://d2oto3d7z6t29c.cloudfront.net/entries/transformed/a7/40/708116_d428a58bdae54037a9a7ee7f0f2e8e65.jpeg",
            "https://sieuthismartphone.vn/data/product/small/small_lmf1676260248.png",
          ]}
        />

        <ProductInfo product={product} />
      </div>
      <ProductSpecs specs={specs} />
      <div className="related-products">
        <h2>Related Products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default ProductDetail
