import React, { useEffect, useState } from 'react'
import CategoryContainer from '../components/CategoryContainer'
import ProductsContainer from '../components/ProductsContainer'
import { useCategories } from '../context/categories/useCategories';

export default function Landing() {

  const {categories} = useCategories();

  useEffect(() => {
    
  }) 

  return (
    <>
      <CategoryContainer/>
      <h3>Category: {categories}</h3>
      <ProductsContainer/>      
    </>
  )
}
