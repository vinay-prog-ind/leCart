import React from "react";

export default function Input({
    type,
    name,
    onChange,
    label,
    ofType,
    isError,
}) {
    return (
        <div
            className={`${ofType}-input-field ${isError ? "input-error" : ""}`}>
            <label htmlFor={name}>{label}</label>
            <input
                className={`input-field-active`}
                type={type}
                name={name}
                id={`${ofType}-btn ${name}`}
                onChange={onChange}
            />
        </div>
    );
}
