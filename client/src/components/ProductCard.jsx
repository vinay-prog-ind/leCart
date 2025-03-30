import React from 'react'
import Button from './ui/Button'
import { useNavigate } from 'react-router-dom'
export default function ProductCard({image, title, price, id}) {
  
    const navigate = useNavigate();

  const handleNavigate = () => {
    const i = id;
    navigate(`/product/${i}`);
  }

    return (
    <div className='product-card' onClick={handleNavigate}>
        <img src={image} alt="" />
        <div className='product-card-bottom'>
            <h2>{title}</h2>
            <h3>₹{price}</h3>
        </div>
    </div>
  )
}
