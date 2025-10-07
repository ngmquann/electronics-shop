import { Row, Col } from "antd"
import {
  TwitterOutlined,
  FacebookFilled,
  InstagramOutlined,
} from "@ant-design/icons"
import { FaTiktok } from "react-icons/fa"
import "./Footer.css"
import logo from "../../assets/images/logo_vector_white.svg"

const Footer = () => {
  return (
    <div className="footer">
      <Row gutter={[40, 20]} justify="space-between">
        <Col xs={24} md={8}>
          <div className="footer-logo">
            <img alt="Logo" src={logo} />
          </div>
          <p className="footer-text">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>
          <div className="footer-socials">
            <TwitterOutlined />
            <FacebookFilled />
            <FaTiktok />
            <InstagramOutlined />
          </div>
        </Col>

        <Col xs={24} md={8} lg={6}>
          <h3 className="footer-title">Services</h3>
          <ul className="footer-list">
            <li>Bonus program</li>
            <li>Gift cards</li>
            <li>Credit and payment</li>
            <li>Service contracts</li>
            <li>Non-cash account</li>
            <li>Payment</li>
          </ul>
        </Col>

        {/* --- Right Column --- */}
        <Col xs={24} md={8} lg={6}>
          <h3 className="footer-title">Assistance to the buyer</h3>
          <ul className="footer-list">
            <li>Find an order</li>
            <li>Terms of delivery</li>
            <li>Exchange and return of goods</li>
            <li>Guarantee</li>
            <li>Frequently asked questions</li>
            <li>Terms of use of the site</li>
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
