import React, { useContext, useEffect } from 'react'
import styles from '../styles/ListadoProducto.module.scss'
import { useCart } from '../hooks/useCart'
import Cookies from 'js-cookie'
import { UserContext } from '../context/UserProvider'

export const ListadoProducto = ({ productos }) => {
    const { setUsuario } = useContext(UserContext)

    const { agregarProducto, carro } = useCart()

    // const userToken = Cookies.get('usertoken')
    // console.log(userToken)
    // if (userToken) {
    //     const decodedToken = decodeURIComponent(escape(atob(userToken.split('.')[1])))
    //     const { id, email, firstName, lastName, direccion } = JSON.parse(decodedToken)
    //     console.log(id) // ID del usuario
    //     console.log(email) // Correo electrónico del usuario
    //     console.log(firstName) // Nombre del usuario
    //     console.log(lastName) // Apellido del usuario
    //     console.log(direccion) // Objeto con la información de dirección

    //     setUsuario([{
    //         id: id,
    //         correo: email,
    //         nombre: firstName,
    //         apellido: lastName,
    //         direccion: {
    //             calle: direccion.calle,
    //             numero: direccion.numero,
    //             ciudad: direccion.ciudad,
    //             telefono: direccion.telefono,
    //         },
    //     }])
    // }

    useEffect(() => {
        //Traer el token del usuario
        const userToken = Cookies.get('usertoken')
        if (userToken) {
            const decodedToken = decodeURIComponent(escape(atob(userToken.split('.')[1])))
            const { id, email, firstName, lastName, direccion, admin } = JSON.parse(decodedToken)
            console.log(id) // ID del usuario
            console.log(email) // Correo electrónico del usuario
            console.log(firstName) // Nombre del usuario
            console.log(lastName) // Apellido del usuario
            console.log(direccion) // Objeto con la información de dirección
            console.log(admin) // Tipo de usuario

            setUsuario({
                id: id,
                correo: email,
                nombre: firstName,
                apellido: lastName,
                admin: admin,
                direccion: {
                    calle: direccion.calle,
                    numero: direccion.numero,
                    ciudad: direccion.ciudad,
                    telefono: direccion.telefono,
                },

            })
        }
    }, [])

    console.log(carro)
    const handleSubmit = (e, producto) => {
        e.preventDefault()
        console.log('Datos del producto:', producto)
        agregarProducto({
            id: producto._id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
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
