import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProducts } from "../utils/api";
import LoadingComponent from "./ui/LoadingComponent";
import ProductCard from "./ProductCard";
import { useCategories } from "../context/categories/useCategories";

export default function ProductsContainer() {
    const { categoryId } = useCategories();

    const { isPending, isError, error, data } = useQuery({
        queryKey: ["products", categoryId],
        queryFn: fetchProducts,
    });
    return (
        <div className="products-containers">
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
