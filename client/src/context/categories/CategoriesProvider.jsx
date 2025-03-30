import React, { useState } from 'react'
import { CategoriesContext } from './categoriesContext'

export default function CategoriesProvider({children}) {
    
    const [categories, setCategories] = useState(localStorage.getItem('all'));
    const [categoryId, setCategoryId] = useState(0);
    const changeCategories = (category, id) => {
        setCategories(category)
        setCategoryId(id);
    }

    return (
        <CategoriesContext.Provider value={{categoryId, setCategoryId, categories, setCategories, changeCategories}}>{children}</CategoriesContext.Provider>
    )
}
