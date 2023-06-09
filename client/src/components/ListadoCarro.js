import React, { useContext } from 'react'
import { CartContext } from '../context/CartProvider'
import styles from '../styles/CarroCompras.module.scss'

export const ListadoCarro = () => {

    const { carro } = useContext(CartContext)

    //Calcular Total del Carro
    const calcularTotal = () => {
        let total = 0
        carro.forEach((item) => {
            total += parseInt(item.producto.precio)
        })
        return total
    }

    return (
        <>
            <div>
                <h2>Carro de Compras</h2>
                <table className={styles['tabla-carro']}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carro.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.producto.nombre}</td>
                                <td>{item.producto.precio}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2">Total:</td>
                            <td>{calcularTotal()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
