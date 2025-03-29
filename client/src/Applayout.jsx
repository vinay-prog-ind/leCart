import React from 'react'
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'


export default function Applayout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}
