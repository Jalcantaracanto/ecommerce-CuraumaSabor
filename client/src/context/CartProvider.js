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
    }

    const agregarProducto = (productoNuevo) => {
        let nuevoCarro = []
        let carroPronto = false

        if (carro.length === 0) {
            setCarro([productoNuevo])
        } else {
            carro.forEach((unProducto) => {
                if (unProducto.id === productoNuevo.id) {
                    //si el producto ya está en el carro, el carro nuevo y el carro viejo son iguales. (salvo por la cantidad de ese producto)
                    nuevoCarro = [...carro]
                    nuevoCarro.forEach((otroProducto) => {
                        if (otroProducto.id === productoNuevo.id) {
                            otroProducto.cantidad += productoNuevo.cantidad
                            carroPronto = true
                        }
                    })
                }
            })
            if (!carroPronto) {
                nuevoCarro = [...carro, productoNuevo]
            }
            setCarro([...nuevoCarro])
        }
    }

    const eliminarProducto = (id) => {
        let nuevoCarro = []
        nuevoCarro = carro.filter((item) => item.id !== id)
        setCarro([...nuevoCarro])
    }

    //Sin uso actualmente
    const modificarCantidad = (id, cantidad) => {
        let nuevoCarro = []
        nuevoCarro = carro.map((item) => {
            if (item.id === id) {
                item.cantidad = cantidad
            }
            return item
        })
        setCarro([...nuevoCarro])
    }

    return (
        <CartContext.Provider
            value={{
                carro,
                limpiarCarro,
                agregarProducto,
                setCarro,
                eliminarProducto,
                modificarCantidad,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
