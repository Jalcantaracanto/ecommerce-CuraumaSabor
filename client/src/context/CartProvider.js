import React, { useState, useEffect } from 'react'

export const CartContext = React.createContext([])

export const CartProvider = ({ children }) => {
    const [carro, setCarro] = useState([])

    useEffect(() => {
        // Recuperar el carro del almacenamiento local al cargar la página
        const storedCart = localStorage.getItem('carro')
        if (storedCart) {
            setCarro(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        // Guardar el carro en el almacenamiento local cada vez que cambie
        localStorage.setItem('carro', JSON.stringify(carro))
    }, [carro])

    //vacio el carro
    const limpiarCarro = () => {
        setCarro([])
        localStorage.clear()
    }

    //Verifica si un elemento con el id especificado se encuentra en el arreglo carro
    const estaEnCarro = (id) => (carro.find((item) => item.id === id) ? true : false)

    //Quita un producto del carro (que aun no está hecho)
    const quitarProducto = (id) => setCarro(carro.filter((item) => item.id !== id))

    const agregarProducto = (producto) => {
        setCarro([...carro, producto])
        console.log('Carro:', carro)
    }

    return (
        <CartContext.Provider
            value={{
                carro,
                limpiarCarro,
                estaEnCarro,
                quitarProducto,
                agregarProducto,
                setCarro,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
