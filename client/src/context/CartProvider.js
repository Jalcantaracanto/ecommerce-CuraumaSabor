import React, { useState, useEffect } from 'react'

export const CartContext = React.createContext([])

// const initialState = []
// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_TO_CART':

//     }
//     return state
// }

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
    const limpiarCarro = (e) => {
        e.preventDefault()
        setCarro([])
    }

    // //Verifica si un elemento con el id especificado se encuentra en el arreglo carro
    // const estaEnCarro = (id) => (carro.find((item) => item.id === id) ? true : false)

    // //Quita un producto del carro (que aun no está hecho)
    // const quitarProducto = (id) => setCarro(carro.filter((item) => item.id !== id))

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

    return (
        <CartContext.Provider
            value={{
                carro,
                limpiarCarro,
                agregarProducto,
                setCarro,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
