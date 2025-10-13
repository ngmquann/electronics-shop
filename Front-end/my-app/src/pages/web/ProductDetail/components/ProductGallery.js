import { useState } from "react"

function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="product-gallery">
      <div className="thumbs">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            onClick={() => setMainImage(img)}
            className={mainImage === img ? "active" : ""}
          />
        ))}
      </div>

      <div className="main-images">
        <img src={mainImage} alt="main" />
      </div>
    </div>
  )
}

export default ProductGallery
