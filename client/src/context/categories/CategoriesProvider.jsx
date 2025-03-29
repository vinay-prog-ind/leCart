import React, { useState } from 'react'
import { CategoriesContext } from './categoriesContext'

export default function CategoriesProvider({children}) {
    
    const [categories, setCategories] = useState(localStorage.getItem('categories'));

    

    return (
        <CategoriesContext.Provider >{children}</CategoriesContext.Provider>
    )
}
