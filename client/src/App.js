import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { Register } from './views/Register'
import { Login } from './views/Login'
import { Productos } from './views/Productos'
import React from 'react'
import { CartProvider } from './context/CartProvider'
import { NavbarWeb } from './components/NavbarWeb'
import { CarroCompras } from './views/CarroCompras'

function App() {
    return (
        <>
            <CartProvider>
                <NavbarWeb />
                <Routes>
                    <Route path="/" element={<Productos />} />
                    <Route path="/home" element={<Productos />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Productos/nuevo-producto" element={<Register />} />
                    <Route path="/Productos/lista-productos" element={<Productos />} />
                    <Route path="/Carro-Compras" element={<CarroCompras />} />
                </Routes>
            </CartProvider>
        </>
    )
}

export default App
