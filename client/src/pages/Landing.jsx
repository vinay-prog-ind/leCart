import React, { useEffect, useState } from 'react'
import CategoryContainer from '../components/CategoryContainer'
import ProductsContainer from '../components/ProductsContainer'
import { useCategories } from '../context/categories/useCategories';

export default function Landing() {

  useEffect(() => {
    
  }) 

  return (
    <div className='landing'>
      <div className='landing-section'>
        <CategoryContainer/>
        <ProductsContainer/>      
      </div>
    </div>
  )
}
 