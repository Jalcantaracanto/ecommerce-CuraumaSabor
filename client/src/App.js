// import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { Register } from './views/Register'
import { Login } from './views/Login'
import { Productos } from './views/Productos'
import React from 'react'
import { CartProvider } from './context/CartProvider'
import { NavbarWeb } from './components/NavbarWeb'
import { CarroCompras } from './views/CarroCompras'
import { AgregarProducto } from './views/AgregarProducto'
import { UserProvider } from './context/UserProvider'
import { ListaProductos } from './views/ListaProductos'
import { DetalleProducto } from './views/DetalleProducto'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

//Material UI
import Container from '@mui/material/Container'

function App() {
    return (
        <>
            <UserProvider>
                <CartProvider>
                    <NavbarWeb />
                    <Container maxWidth="lg">
                        <Routes>
                            <Route path="/" element={<Productos />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro-usuario" element={<Register />} />
                            <Route path="/productos/nuevo-producto" element={<AgregarProducto />} />
                            <Route path="/productos/lista-productos" element={<Productos />} />
                            <Route path="/Carro-Compras" element={<CarroCompras />} />
                            <Route path="/productos/lista-admin" element={<ListaProductos />} />
                            <Route path="/productos/lista-admin/detalle/:id" element={<DetalleProducto />} />
                        </Routes>
                    </Container>
                </CartProvider>
            </UserProvider>
        </>
    )
}

export default App
