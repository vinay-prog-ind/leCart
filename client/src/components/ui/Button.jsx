import React from 'react'

export default function Button({text, onClick, type="primary"}) {
  return (
    <button className={`btn ${type}-btn`} onClick={onClick}>{text}</button>
  )
}
