import React, { useContext } from 'react'
import { CartContext } from '../context/CartProvider'
import styles from '../styles/CarroCompras.module.scss'
import { UserContext } from '../context/UserProvider'


export const ListadoCarro = () => {

    const { usuario } = useContext(UserContext)
    const { carro } = useContext(CartContext)

    console.log(usuario)

    //Calcular Total del Carro
    const calcularTotal = () => {
        let total = 0
        carro.forEach((item) => {
            total += parseInt(item.precio * item.cantidad)
        })

        // Formatear el total con puntos cada tres dígitos
        const totalFormateado = total.toLocaleString()
        return totalFormateado
    }

    return (
        <>
            <main className={styles['main-carro']}>
                <section className={styles['tabla']}>
                    <h2>Carro de Compras</h2>
                    <table className={styles['tabla-carro']}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carro.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{parseInt(item.precio * item.cantidad).toLocaleString()}</td>
                                </tr>
                            ))}
                            {/* <tr>
                                <td colSpan="2">Total:</td>
                                <td>{calcularTotal()}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </section>
                <section className={styles['detalle']}>
                    <h3>Total del Carrito</h3>
                    <section className={styles['total']}>
                        <label htmlFor="total">Total a pagar:</label>
                        <p>{`$${calcularTotal()}`}</p>
                    </section>

                    <button>Comprar</button>
                </section>
            </main>
        </>
    )
}
