import React from 'react'

export default function Input({type, name, onChange, label}) {
  return (
    <div className='login-input-field'>
        <label htmlFor={name}>{label}</label>
        <input className='input-field-active' type={type} name={name} id={`login-btn ${name}`} onChange={onChange} />
    </div>
  )
}
