import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllPost } from "../utils/api";
import LoadingComponent from "./ui/LoadingComponent";
import ProductCard from "./ProductCard";
import { useCategories } from "../context/categories/useCategories";

export default function ProductsContainer() {
    
    const {categories} = useCategories();

    const { isPending, isError, error, data } = useQuery({
        queryKey: categories ? ["products", categories] : ["products"],
        queryFn: () => {categories ? " " : fetchAllPost},
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
                )) } 
              </div>
            )}
        </div>
    );
}
