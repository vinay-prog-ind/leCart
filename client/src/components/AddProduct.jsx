import React, { useEffect, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { addPost, fetchCategories } from "../utils/api";
import Textbox from "./ui/Textbox";

export default function AddProduct() {
    const [categories, setCategories] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [productData, setProductData] = useState({
        product_name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category_id: "",
        isActive: "",
        image_uri: "",
    });

    const sanitizeInput = (value) => {
        return value
            .replace(/<[^>]*>?/gm, "")
            .replace(/[^\w\s.,-]/gi, "")
            .trim();
    };

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;

        if(type==="text") sanitizeInput(value);
        
        const newValue = type === "checkbox" ? checked : value;

        
        let processedValue = newValue;
        if ((name === "price" || name === "stock_quantity") && value !== "") {
            processedValue = Number(value);
        }

        setProductData({
            ...productData,
            [name]: processedValue,
        });


    };

    const handleSubmit = async () => {
        try {
            const data = await addPost(productData);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchCategory = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        fetchCategory();
    }, []);

    return (
        <>
            {/* <div className="product-input-div-sep-outer start">
                <div className="product-input-div">
                    <label htmlFor="category">category: </label>
                    {categories.length ? (
                        // <select name="category_id" value={productData.category_id} onChange={(e)=>console.log(e.target.value)}>
                        <select
                            name="category_id"
                            defaultValue={"select"}
                            onChange={handleOnChange}>
                            <option value="select" disabled>
                                Select Category
                            </option>
                            {categories.map((el) => (
                                <optgroup key={el.id} label={el.name}>
                                    {el.subCategories?.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    ) : (
                        ""
                    )}
                </div>
            </div> */}
            <div className="form-container">
                <div onSubmit={handleSubmit}>
                    <h2 className="form-title">Add New Product</h2>

                    <div className="form-group">
                        <label className="form-label" htmlFor="product_name">
                            Product Name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={productData.product_name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="form-textarea"
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleOnChange}
                            rows="4"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="price">
                                Price
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                id="price"
                                name="price"
                                value={productData.price}
                                onChange={handleOnChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="stock_quantity">
                                Stock Quantity
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                id="stock_quantity"
                                name="stock_quantity"
                                value={productData.stock_quantity}
                                onChange={handleOnChange}
                                min="0"
                                step="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="category_id">
                            Category
                        </label>
                        {categories.length && (
                            <select
                                className="form-select"
                                id="category_id"
                                name="category_id"
                                // value={productData.category_id}
                                required
                                defaultValue={"select"}
                                onChange={handleOnChange}>
                                <option value="select" disabled>
                                    Select Category
                                </option>
                                {categories?.map((el) => (
                                    <optgroup key={el.id} label={el.name}>
                                        {el.subCategories?.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="form-group checkbox-group">
                        <input
                            className="form-checkbox"
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={productData.isActive}
                            onChange={handleOnChange}
                        />
                        <label
                            className="form-label checkbox-label"
                            htmlFor="isActive">
                            Active Product
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="image_uri">
                            Product Image
                        </label>
                        <input
                            className="form-file-input"
                            type="file"
                            id="image_uri"
                            name="image_uri"
                            accept="image/*"
                            onChange={handleOnChange}
                        />
                        {imagePreview && (
                            <div className="image-preview-container">
                                <img
                                    src={imagePreview}
                                    alt="Product preview"
                                    className="image-preview"
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="reset" className="btn btn-secondary">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
