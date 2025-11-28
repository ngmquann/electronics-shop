import React, { useState, useEffect } from "react"
import {
  Radio,
  Button,
  Space,
  Card,
  Tag,
  Divider,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd"
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import StepProgress from "../../../components/Checkout/StepProgress"
import "./Step1Address.css"

const { Option } = Select

const Step1Address = ({
  onNext,
  onBack,
  selectedAddress,
  setSelectedAddress,
}) => {
  const [addresses, setAddresses] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    loadAddresses()
  }, [])

  const loadAddresses = async () => {
    try {
      const value = localStorage.getItem("addresses")
      if (value) {
        const loadedAddresses = JSON.parse(value)
        setAddresses(loadedAddresses)
        if (loadedAddresses.length > 0 && selectedAddress === null) {
          setSelectedAddress(loadedAddresses[0])
        }
      }
    } catch (error) {
      console.log("No addresses found, starting fresh", error)
    }
  }

  const saveAddresses = async (newAddresses) => {
    try {
      localStorage.setItem("addresses", JSON.stringify(newAddresses))
      setAddresses(newAddresses)
    } catch (error) {
      message.error("Không thể lưu địa chỉ")
    }
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleEdit = (address) => {
    setEditingAddress(address)
    form.setFieldsValue(address)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    const newAddresses = addresses.filter((addr) => addr.id !== id)
    await saveAddresses(newAddresses)

    if (selectedAddress?.id === id && newAddresses.length > 0) {
      setSelectedAddress(newAddresses[0])
    } else if (newAddresses.length === 0) {
      setSelectedAddress(null)
    }

    message.success("Đã xóa địa chỉ")
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()

      let newAddresses
      if (editingAddress) {
        newAddresses = addresses.map((addr) =>
          addr.id === editingAddress.id
            ? { ...values, id: editingAddress.id }
            : addr
        )
        if (selectedAddress?.id === editingAddress.id) {
          setSelectedAddress({ ...values, id: editingAddress.id })
        }
      } else {
        const newAddress = {
          ...values,
          id: Date.now(),
        }
        newAddresses = [...addresses, newAddress]
        setSelectedAddress(newAddress)
      }

      await saveAddresses(newAddresses)
      setIsModalOpen(false)
      form.resetFields()
      message.success(
        editingAddress ? "Đã cập nhật địa chỉ" : "Đã thêm địa chỉ mới"
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleNext = () => {
    if (!selectedAddress) {
      message.warning("Vui lòng chọn địa chỉ giao hàng")
      return
    }
    onNext()
  }

  return (
    <div className="step-container">
      <StepProgress currentStep={0} />

      <div className="content-wrapper">
        <h2>Chọn địa chỉ giao hàng</h2>

        {addresses.length > 0 ? (
          <Radio.Group
            value={selectedAddress?.id}
            onChange={(e) => {
              const addr = addresses.find((a) => a.id === e.target.value)
              setSelectedAddress(addr)
            }}
            style={{ width: "100%" }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size={16}>
              {addresses.map((addr) => (
                <Card
                  key={addr.id}
                  className="address-card"
                  style={{ padding: "20px" }}
                >
                  <div className="address-content">
                    <div className="address-left">
                      <Radio value={addr.id}>
                        <div className="address-details">
                          <div>
                            <strong>{addr.name}</strong>
                            <Tag className="address-label">{addr.label}</Tag>
                          </div>
                          <div className="address-text">
                            {addr.address}, {addr.city}, {addr.state}{" "}
                            {addr.zipCode}
                          </div>
                          <div className="address-phone">{addr.phone}</div>
                        </div>
                      </Radio>
                    </div>

                    <div className="address-actions">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(addr)}
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(addr.id)}
                        danger
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </Space>
          </Radio.Group>
        ) : (
          <div className="no-address">
            <p>Chưa có địa chỉ. Vui lòng thêm địa chỉ mới.</p>
          </div>
        )}

        <div className="add-address-section" onClick={handleAddNew}>
          <Divider>
            <div className="add-icon-wrapper">
              <PlusOutlined />
            </div>
          </Divider>
          <div className="add-address-text">Thêm địa chỉ mới</div>
        </div>

        <div className="button-group">
          <Button size="large" onClick={onBack} className="btn-back">
            Quay lại
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleNext}
            className="btn-next"
          >
            Tiếp tục
          </Button>
        </div>
      </div>

      <Modal
        title={editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item
            name="name"
            label="Tên địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập tên địa chỉ!" }]}
          >
            <Input placeholder="VD: Nhà riêng, Văn phòng" />
          </Form.Item>

          <Form.Item
            name="label"
            label="Nhãn"
            rules={[{ required: true, message: "Vui lòng chọn nhãn!" }]}
          >
            <Select placeholder="Chọn nhãn">
              <Option value="HOME">NHÀ RIÊNG</Option>
              <Option value="OFFICE">VĂN PHÒNG</Option>
              <Option value="OTHER">KHÁC</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="VD: 123 Nguyễn Văn Linh" />
          </Form.Item>

          <Form.Item
            name="city"
            label="Thành phố"
            rules={[{ required: true, message: "Vui lòng nhập thành phố!" }]}
          >
            <Input placeholder="VD: Hồ Chí Minh" />
          </Form.Item>

          <Space style={{ width: "100%" }} size={16}>
            <Form.Item
              name="state"
              label="Quận/Huyện"
              rules={[{ required: true, message: "Vui lòng nhập quận/huyện!" }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="VD: Quận 1" />
            </Form.Item>

            <Form.Item
              name="zipCode"
              label="Mã bưu điện"
              rules={[
                { required: true, message: "Vui lòng nhập mã bưu điện!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="VD: 700000" />
            </Form.Item>
          </Space>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[\d\s()+-]+$/,
                message: "Vui lòng nhập số điện thoại hợp lệ!",
              },
            ]}
          >
            <Input placeholder="VD: 0912345678" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Step1Address
