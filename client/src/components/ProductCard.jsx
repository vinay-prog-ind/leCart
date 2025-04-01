import React from 'react'
import Button from './ui/Button'
import { useNavigate } from 'react-router-dom'
export default function ProductCard({image, title, isActive, price, id}) {
  
    const navigate = useNavigate();

  const handleNavigate = () => {
    const i = id;
    navigate(`/product/${i}`);
  }

    return (
    <div className='product-card' onClick={handleNavigate}>
        <div className='product-card-top'>
          <img src={image} alt="" />
          <p>₹{price}</p>
        </div>
        <div className='product-card-bottom'>
          <h2>{title}</h2>
          <h3 className={`${isActive ? "product-InStock" : "product-OutOfStock"}`}>{isActive ? "In Stock" : "Out of  Stock"}</h3>
        </div>
    </div>
  )
}
