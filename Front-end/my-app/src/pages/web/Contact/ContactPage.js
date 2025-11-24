import "./style.css" // Adjust path if needed

export default function ContactPage() {
  return (
    <div className="container-contact">
      <div className="contact-info">
        <h2>Contact Us</h2>

        <div className="item">
          <strong>Address</strong>
          <span>
            70 Tô Ký, Tân Chánh Hiệp, Quận 12
            <br />
            Thành phố Hồ Chí Minh, Việt Nam
          </span>
        </div>

        <div className="item">
          <strong>Phone</strong>
          <span>02838992862</span>
        </div>

        <div className="item">
          <strong>Email</strong>
          <span>
            transport@ut.com
            <br />
            hello@hotmail.com
          </span>
        </div>
      </div>

      <div className="form-container">
        <h2>Or Write Us</h2>

        <input type="text" placeholder="Name *" />
        <input type="email" placeholder="Email *" />
        <textarea placeholder="Enter Your Message" />
        <button>SEND MESSAGE</button>
      </div>
    </div>
  )
}
