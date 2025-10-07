import { Carousel } from "antd";
import { BsSmartwatch } from "react-icons/bs";
import { CiHeadphones } from "react-icons/ci";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward, IoIosPhonePortrait } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuCamera } from "react-icons/lu";
import CategoryItem from "../../../components/Category/Category";
import ProductTabs from "../../../components/ProductTabs/ProductTabs";

function Home() {
  var listImgBanner = [
    "https://www.apple.com/v/iphone-17-pro/a/images/meta/iphone-17-pro_overview__er68vecct16q_og.png?202509240008",
    "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:7.5257687:1757452489/Em%20evento%20de%20lan%C3%A7amento,%20Apple%20revela%20novos%20modelos%20do%20iPhone%2017%20(3).jpeg?f=16x9&h=574&w=1020&$p$f$h$w=bf526cb",
    "https://www.apple.com/v/iphone-17/a/images/meta/iphone-17_overview__d4o74q28yjma_og.png",
  ]

  var listCategories = [
    { icon: <IoIosPhonePortrait />, label: "Phones" },
    { icon: <BsSmartwatch />, label: "Smart Watches" },
    { icon: <LuCamera />, label: "Cameras" },
    { icon: <CiHeadphones />, label: "Headphones" },
    { icon: <HiOutlineComputerDesktop />, label: "Computers" },
    { icon: <IoGameControllerOutline />, label: "Gaming" },
  ]
  return (
    <>
      <Carousel autoplay>
        {listImgBanner.map((img, index) => (
          <div key={index}>
            <img alt="Banner" src={img} style={{ width: "100%" }} />
          </div>
        ))}
      </Carousel>
      <div
        className="category"
        style={{
          padding: "80px 160px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            Browse By Category
          </p>
          <span>
            <IoIosArrowBack style={{ fontSize: "32px" }} />
            <IoIosArrowForward style={{ fontSize: "32px" }} />
          </span>
        </div>
        <div style={{ height: "32px" }}></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {listCategories.map((cate, index) => (
            <CategoryItem key={index} icon={cate.icon} label={cate.label} />
          ))}
        </div>
        <div style={{ padding: "56px 0" }}>
          <ProductTabs />
        </div>
      </div>
    </>
  )
}

export default Home
