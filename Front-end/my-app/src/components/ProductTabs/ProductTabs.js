import React, { useState, useEffect } from "react"
import { Tabs, Spin, message } from "antd"
import ProductGrid from "../ProductGrid/ProductGrid"
import productApi from "../../api/productApi"
import { data } from "react-router-dom"
import { ProductService } from "../../services/ProductService"

const { TabPane } = Tabs

const ProductTabs = () => {
  const [tab1Data, setTab1Data] = useState([])
  const [tab2Data, setTab2Data] = useState([])
  const [tab3Data, setTab3Data] = useState([])

  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const loadProducts = async () => {
    setLoading(true)
    try {
      const res1 = await ProductService.getProductHome(15)
      const res2 = await ProductService.getProductHome(10)
      const res3 = await ProductService.getProductHome(7)
      console.log(res1)
      setTab1Data(res1)
      setTab2Data(res2)
      setTab3Data(res3)
    } catch (error) {
      messageApi.error("Không thể tải sản phẩm")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <>
      {contextHolder}

      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="New Arrival" key="1">
          {loading ? <Spin /> : <ProductGrid products={tab1Data} />}
        </TabPane>

        <TabPane tab="Bestseller" key="2">
          {loading ? <Spin /> : <ProductGrid products={tab2Data} />}
        </TabPane>

        <TabPane tab="Featured Products" key="3">
          {loading ? <Spin /> : <ProductGrid products={tab3Data} />}
        </TabPane>
      </Tabs>
    </>
  )
}

export default ProductTabs
