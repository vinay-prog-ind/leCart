import { useContext } from "react";
import { CategoriesContext } from "./categoriesContext";

export const useCategories = () => {
    return useContext(CategoriesContext);
}