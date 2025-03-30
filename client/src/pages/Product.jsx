import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostDetail } from "../utils/api";
import LoadingComponent from "../components/ui/LoadingComponent";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState();

    const [quantity, setQuantity] = useState(1);

    const { isPending, isError, error, data } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchPostDetail(id),
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div>
            {isPending ? (
                <div className="products-containers-loading">
                    <LoadingComponent />
                </div>
            ) : (
                <div className="product-page">
                    <div className="product-container">
                        <div className="product-image-container">
                            <img
                                src={data.image_uri}
                                alt={data.name}
                                className="product-image"
                            />
                            {data.isActive ? (
                                <span className="product-badge in-stock">
                                    Available
                                </span>
                            ) : (
                                <span className="product-badge out-of-stock">
                                    Unavailable
                                </span>
                            )}
                        </div>

                        <div className="product-details">
                            <h1 className="product-name">{data.name}</h1>

                            <div className="product-meta">
                                <span className="product-id">
                                    ID: {data.product_id}
                                </span>
                                <span className="product-category">
                                    Category: {data.category_id}
                                </span>
                                <span className="product-date">
                                    Added: {formatDate(data.created_at)}
                                </span>
                            </div>

                            <p className="product-description">
                                {data.description}
                            </p>

                            <div className="product-pricing">
                                <span className="product-price">
                                    ${data.price}
                                </span>
                                <span className="product-stock">
                                    {data.stock_quantity > 0
                                        ? `${data.stock_quantity} in stock`
                                        : "Out of stock"}
                                </span>
                            </div>

                            <div className="product-actions">
                                <div className="quantity-control">
                                    <button
                                        className="quantity-btn"
                                        onClick={() =>
                                            quantity > 1 &&
                                            setQuantity(quantity - 1)
                                        }
                                        disabled={quantity <= 1}>
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={data.stock_quantity}
                                        value={quantity}
                                        // onChange={handleQuantityChange}
                                        className="quantity-input"
                                    />
                                    <button
                                        className="quantity-btn"
                                        onClick={() =>
                                            quantity < data.stock_quantity &&
                                            setQuantity(quantity + 1)
                                        }
                                        disabled={
                                            quantity >= data.stock_quantity
                                        }>
                                        +
                                    </button>
                                </div>

                                <button
                                    className="buy-button"
                                    disabled={
                                        !data.isActive ||
                                        data.stock_quantity === 0
                                    }>
                                    BUY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
