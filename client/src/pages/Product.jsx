import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { buyProduct, fetchPostDetail } from "../utils/api";
import LoadingComponent from "../components/ui/LoadingComponent";
import Button from "../components/ui/Button";
import { formatDate } from "../utils/formateDate";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [openForm, setOpenForm] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(0);

    const navigate = useNavigate();

    const { isPending, isError, error, data } = useQuery({
        queryKey: ["product", id],
        queryFn: fetchPostDetail,
        // queryFn: () => test(id),
    });
    const [details, setDetails] = useState({
        product_id: id,
        address: "",
        pincode: "",
        email: "",
        quantity: quantity,
        total_cost: quantity * data?.price,
    });

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= product.stock_quantity) {
            setQuantity(value);
        }
    };

    const handleBackNavigate = () => {
        navigate("/");
    };

    const handleBuyToggle = (value) => {
        setOpenForm(value);
    };

    const handleOnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await buyProduct(details);
    };

    // useEffect(() => {
    //     setCost(quantity * data?.price);
    // }, [quantity]);

    return (
        <div className="product-page-section">
            <div className="back-btn btn" onClick={handleBackNavigate}>
                &#10094; Back
            </div>
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
                                        onChange={handleQuantityChange}
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

                                <Button
                                    type="buy"
                                    disabled={
                                        !data.isActive ||
                                        data.stock_quantity === 0
                                    }
                                    text={"BUY"}
                                    onClick={() => handleBuyToggle(true)}
                                />
                            </div>
                        </div>
                    </div>
                    {openForm && (
                        <div
                            className={`${
                                openForm ? "open-form address-form" : "close"
                            }`}>
                            <div className="address-form-inner">
                                <div
                                    className="form-container"
                                    onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="product_name">
                                            Product Name
                                        </label>
                                        <input
                                            className="form-input"
                                            type="text"
                                            id="product_name"
                                            name="product_name"
                                            defaultValue={data.name}
                                            onChange={handleOnChange}
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="product_name">
                                            Address
                                        </label>
                                        <input
                                            className="form-input"
                                            type="text"
                                            // id="product_name"
                                            name="address"
                                            // value={productData.product_name}
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="product_name">
                                            Pincode
                                        </label>
                                        <input
                                            className="form-input"
                                            type="number"
                                            // id="product_name"
                                            name="pincode"
                                            // value={productData.product_name}
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="product_name">
                                            Email address
                                        </label>
                                        <input
                                            className="form-input"
                                            type="text"
                                            // id="product_name"
                                            name="email"
                                            // value={productData.product_name}
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </div>

                                    <div className="seperate-10px">
                                        <div className="form-group">
                                            <label
                                                className="form-label"
                                                htmlFor="product_name">
                                                Quantity
                                            </label>
                                            <input
                                                className="form-input"
                                                type="number"
                                                // id="product_name"
                                                name="quantity"
                                                defaultValue={quantity}
                                                // value={productData.product_name}
                                                onChange={handleOnChange}
                                                required
                                                disabled
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label
                                                className="form-label"
                                                htmlFor="product_name">
                                                Total
                                            </label>
                                            <input
                                                className="form-input"
                                                type="number"
                                                // id="product_name"
                                                name="total_cost"
                                                defaultValue={quantity * data?.price}
                                                // value={productData.product_name}
                                                onChange={handleOnChange}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <p
                                        style={{
                                            color: "red",
                                            marginBottom: "15px",
                                        }}>
                                        we only accept Cash on delivery, Online
                                        banking in not yet available*
                                    </p>
                                    <div className="seperate-10px">
                                        <Button
                                            type="buy"
                                            text={"CONFIRM ORDER"}
                                            onClick={handleSubmit}
                                        />
                                        <Button
                                            // type="buy"
                                            onClick={() =>
                                                handleBuyToggle(false)
                                            }
                                            text={"CANCEL"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
