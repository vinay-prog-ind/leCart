import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchProducts } from "../utils/api";
import LoadingComponent from "./ui/LoadingComponent";
import ProductCard from "./ProductCard";
import { useCategories } from "../context/categories/useCategories";

export default function ProductsContainer() {
    const { categoryId, categories,  setCategories, setCategoryId} = useCategories();

    const { isPending, isError, error, data } = useQuery({
        queryKey: ["products", categoryId],
        queryFn: fetchProducts,
    });

    const handleCloseCategories = (category) => {
        setCategories(category);
        setCategoryId(0);
    }

    return (
        <div className="products-containers">
            <div className="products-category-name-div">
                <h3 className="products-category-h3">Products</h3>
                <h3 className="products-category-h3"> {">"} </h3>
                <h3 id="products-category-span">{categories === null ? "all" : categories}</h3>
                {
                    categoryId !== 0 ?
                    <h3 className="category-cross" onClick={() => handleCloseCategories("all")}>&#10006;</h3>
                    : ""
                }
            </div>
            {isPending ? (
                <div className="products-containers-loading">
                    <LoadingComponent type={"products"} />
                </div>
            ) : (
                <div className="products-container-inner">
                    {data?.map((el, i) => (
                        <ProductCard
                            key={i}
                            image={el.image_uri}
                            title={el.name}
                            price={el.price}
                            id={el.product_id}
                            isActive={el.isActive}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
