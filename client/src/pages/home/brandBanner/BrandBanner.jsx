import React from 'react'
import "./BrandBanner.css"

function BrandBanner() {
  return (
    <div className="card-banner-container">
      <div className="card-banner-item">
        <img
          src="https://techorbitonline.net/cdn/shop/files/b2.jpg?v=1722350724&width=360"
          className="card-banner-img"
          alt="Banner 1"
        />
      </div>
      <div className="card-banner-item">
        <img
          src="https://techorbitonline.net/cdn/shop/files/b1.jpg?v=1722350724&width=360"
          className="card-banner-img"
          alt="Banner 2"
        />
      </div>
      <div className="card-banner-item">
        <img
          src="https://techorbitonline.net/cdn/shop/files/b3.jpg?v=1722350724&width=360"
          className="card-banner-img"
          alt="Banner 3"
        />
      </div>
      <div className="card-banner-item">
        <img
          src="https://techorbitonline.net/cdn/shop/files/b4.jpg?v=1722350725&width=360"
          className="card-banner-img"
          alt="Banner 4"
        />
      
      </div>
    </div>
  )
}

export default BrandBanner