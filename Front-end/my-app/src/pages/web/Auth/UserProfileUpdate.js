import React, { useEffect, useState } from "react"
import {
  Form,
  Input,
  DatePicker,
  Button,
  Card,
  Upload,
  message,
  Spin,
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { AuthService } from "../../../services/AuthService"
import "./UserProfileUpdate.css"

const UserProfileUpdate = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  )
  const [uploadFile, setUploadFile] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getInfoUser()

        form.setFieldsValue({
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          address: user.address,
          dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        })

        setImageUrl(
          user.image ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        )
      } catch (error) {
        message.error("Không thể tải thông tin người dùng")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [form])

  // Upload ảnh preview
  const handleUpload = (info) => {
    const file = info.file.originFileObj
    if (!file) return

    setUploadFile(file)

    const reader = new FileReader()
    reader.onload = (e) => setImageUrl(e.target.result)
    reader.readAsDataURL(file)
  }

  // Hàm convert file → base64
  const fileToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })

  const onFinish = async (values) => {
    let finalImage = imageUrl

    // Nếu user upload ảnh mới → convert base64
    if (uploadFile) {
      finalImage = await fileToBase64(uploadFile)
    }

    const payload = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD")
        : null,
      image: finalImage,
    }

    try {
      await AuthService.updateInfoUser(payload)
      message.success("Cập nhật thành công!")
    } catch (error) {
      console.log(error)
      message.error("Lỗi khi cập nhật thông tin!")
    }
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="profile-container">
      <Card title="Cập nhật thông tin người dùng" className="profile-card">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="avatar-wrapper">
            <img src={imageUrl} alt="avatar" className="avatar-img" />
            <Upload showUploadList={false} onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </div>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại phải có 10 số",
              },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default UserProfileUpdate
