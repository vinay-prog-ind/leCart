import React, { useState } from 'react'
import { CategoriesContext } from './categoriesContext'

export default function CategoriesProvider({children}) {
    
    const [categories, setCategories] = useState(localStorage.getItem('all'));

    const changeCategories = (category) => {
        console.log(category);
        console.log(categories);
        setCategories(category)
        localStorage.setItem('category', categories);
    }

    return (
        <CategoriesContext.Provider value={{categories, setCategories, changeCategories}}>{children}</CategoriesContext.Provider>
    )
}
