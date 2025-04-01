import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchCategories } from "../utils/api";
import { useCategories } from "../context/categories/useCategories";

export default function CategoryContainer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCurr, setIsCurr] = useState();
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const [currentCategory, setCurrentCategory] = useState("All");

    const {changeCategories} = useCategories();

    const toggleOpen = (i, category) => {
        if(isCurr === i ) {
            setIsCurr();
            setIsOpen(false)
        }
        else {
            setIsCurr(i)
            setIsOpen(isOpen => !isOpen)
        }
    }
    return (
        <div className="category-container">
            {isPending ? <h1>Loading</h1> : data.map((el, i) => (
                <div className="categoryContainer-div" key={el.id} onClick={() => toggleOpen(i, el.name)}>
                    <div className="categoriesContainer-ul">
                        <h3 className={`category-parent ${isCurr === i ? "nav_select" : "nav_close"}`}>{el.name}</h3>
                    </div>
                    <div className={`category-parent-span ${isCurr === i ? "open" : "close"}`}>
                        {el.subCategories?.map((el) => <h3 className="category-sub" key={el.id} onClick={(e) => {e.stopPropagation; changeCategories(el.name, el.id)}}>{el.name}</h3>)}
                    </div>
                </div>
            ))}
        </div>
    );
}
