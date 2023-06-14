import React, { useContext } from 'react'
import { CartContext } from '../context/CartProvider'
import styles from '../styles/CarroCompras.module.scss'
import { UserContext } from '../context/UserProvider'
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom'

export const ListadoCarro = () => {
    const { usuario } = useContext(UserContext)
    const { carro, limpiarCarro } = useContext(CartContext)
    const navigate = useNavigate()

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

    const comprar = () => {
        try {
            const { nombre, apellido, correo } = usuario
            const carroCopia = [...carro]
            const total = calcularTotal()
            const listaProductos = carroCopia.map((item, index) => `${index + 1}. ${item.nombre} - Precio: $${item.precio * item.cantidad}`).join('\n')

            let templateParams = {
                nombre: nombre,
                apellido: apellido,
                detalle: listaProductos,
                correo: correo,
                total: total,
            }

            emailjs.send('service_7nwli6o', 'template_qvpxwhn', templateParams, 'KLSEKZcO95MBJAoTm').then(
                function (response) {
                    console.log('SUCCESS!', response.status, response.text)
                },
                function (error) {
                    console.log('FAILED...', error)
                }
            )

            const confirmacionCompra = window.confirm('Compra realizada con éxito. ¿Desea ir a la página de inicio?')
            // limpiarCarro()

            if (confirmacionCompra) {
                // Redirigir al usuario a '/home' si confirmación es true
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
            alert('Error al realizar la compra')
        }
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

                    <button onClick={comprar}>Comprar</button>
                </section>
            </main>
        </>
    )
}
