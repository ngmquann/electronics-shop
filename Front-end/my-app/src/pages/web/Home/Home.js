import { Carousel, message, Spin } from "antd"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import CategoryItem from "../../../components/Category/Category"
import ProductTabs from "../../../components/ProductTabs/ProductTabs"
import { useEffect, useState } from "react"
import { CategoryService } from "../../../services/CategoryService"
import AIChatSupport from "../../../components/AIChatSupport/AIChatSupport"

function Home() {
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerView = 6
  const maxIndex = Math.max(0, category.length - itemsPerView)

  const loadCategory = async () => {
    setLoading(true)
    try {
      const res = await CategoryService.getAllCategories()

      setCategory([...res, { id: "placeholder", name: "" }])
    } catch (error) {
      messageApi.error("Không thể tải loại sản phẩm")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategory()
  }, [])

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0))
  }

  var listImgBanner = [
    "https://www.apple.com/v/iphone-17-pro/a/images/meta/iphone-17-pro_overview__er68vecct16q_og.png?202509240008",
    "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:7.5257687:1757452489/Em%20evento%20de%20lan%C3%A7amento,%20Apple%20revela%20novos%20modelos%20do%20iPhone%2017%20(3).jpeg?f=16x9&h=574&w=1020&$p$f$h$w=bf526cb",
    "https://www.apple.com/v/iphone-17/a/images/meta/iphone-17_overview__d4o74q28yjma_og.png",
  ]

  if (loading) {
    return <Spin fullscreen size="large" />
  }
  return (
    <>
      {contextHolder}
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
          <span style={{ display: "flex", gap: "8px" }}>
            <IoIosArrowBack
              style={{
                fontSize: "32px",
                cursor: startIndex > 0 ? "pointer" : "not-allowed",
                opacity: startIndex > 0 ? 1 : 0.3,
              }}
              onClick={handlePrev}
            />
            <IoIosArrowForward
              style={{
                fontSize: "32px",
                cursor:
                  startIndex + itemsPerView < category.length
                    ? "pointer"
                    : "not-allowed",
                opacity: startIndex + itemsPerView < category.length ? 1 : 0.3,
              }}
              onClick={handleNext}
            />
          </span>
        </div>
        <div style={{ height: "32px" }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${startIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {category.map((cate, index) => (
              <div
                key={cate.id || index}
                style={{
                  flex: `0 0 ${100 / itemsPerView}%`,
                  padding: "0 8px",
                }}
              >
                <CategoryItem icon={cate.data} label={cate.name} cateId={cate.id} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "56px 0" }}>
          <ProductTabs />
        </div>
      </div>
       <AIChatSupport />
    </>
  )
}

export default Home
