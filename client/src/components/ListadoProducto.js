import React, { useContext } from 'react'
import styles from '../styles/ListadoProducto.module.scss'
import { CartContext } from '../context/CartProvider'
import { useCart } from '../hooks/useCart'

export const ListadoProducto = ({ productos }) => {
    // const { agregarProducto, carro, setCarro } = useContext(CartContext)
    const { agregarProducto, carro, setCarro } = useCart()

    console.log(carro)
    const handleSubmit = (e, producto) => {
        e.preventDefault()
        console.log('Datos del producto:', producto)
        agregarProducto({
            producto: {
                id: producto._id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 0,
            },
        })
    }

    // const aumentarCantidad = (id) => {
    //     const producto = carro.find((item) => item.producto.id === id)
    //     console.log(producto)
    //     // producto.producto.cantidad++
    //     // setCarro([...carro])
    //     // console.log(carro)
    // }

    return (
        <>
            <ul className={styles['producto']}>
                {productos.map((producto, index) => (
                    <li key={index}>
                        <form onSubmit={(e) => handleSubmit(e, producto)}>
                            <img className={styles['producto-img']} src="https://www.recetasderechupete.com/wp-content/uploads/2020/03/Pisco-Sour.jpg" alt="Pisco Sour" />
                            <div className={styles['producto-data']}>
                                <label name="nombre">{producto.nombre}</label>
                                <p name="precio">{`$${producto.precio}`}</p>
                                <input className={styles['producto-btn']} type="submit" value="Agregar al carro" />
                                {/* <button className={styles['producto-btn']} onClick={() => agregarProducto(producto)}>
                                Agregar al Carro
                            </button> */}
                            </div>
                        </form>
                    </li>
                ))}
            </ul>
        </>
    )
}
