import React from 'react'

export default function Input({type, name, onChange, label, ofType}) {
  return (
    <div className={`${ofType}-input-field`}>
        <label htmlFor={name}>{label}</label>
        <input className='input-field-active' type={type} name={name} id={`${ofType}-btn ${name}`} onChange={onChange} />
    </div>
  )
}
