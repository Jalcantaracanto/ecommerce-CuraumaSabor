import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import styles from '../styles/NavbarWeb.module.scss'
import bolsa from '../assets/icons/shopping-bag.svg'
import { CartContext } from '../context/CartProvider'
import { logout } from '../services/user-service'
import { UserContext } from '../context/UserProvider'

export const NavbarWeb = () => {
    const { limpiarCarro } = useContext(CartContext)
    const { usuario } = useContext(UserContext)

    const navigate = useNavigate()

    const desconectar = () => {
        logout()
            .then((response) => {
                console.log(response)
                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <nav className={styles['navbar']}>
                <h3>Curauma Sabor</h3>
                <div>
                    <NavLink to={'/home'} className={styles['links']}>
                        Home
                    </NavLink>
                    <NavLink to={'/productos/lista-productos'} className={styles['links']}>
                        Productos
                    </NavLink>
                    <NavLink className={styles['links']}>Acerca de</NavLink>
                    {usuario.admin === true ? (
                        <NavLink to={'/productos/nuevo-producto'} className={styles['links']}>
                            Agregar Producto
                        </NavLink>
                    ) : null}
                </div>
                <div>
                    <button type="button" onClick={desconectar}>
                        {' '}
                        desconectar
                    </button>
                    <form onSubmit={limpiarCarro}>
                        <input type="submit" value="Vaciar Carro" />
                    </form>

                    <Link to={'/Carro-Compras'}>
                        {/* <CartIcon /> */}
                        <img className={styles['bag-icon']} src={bolsa} alt="Logo" />
                    </Link>
                    <div className="count-products">
                        <span id="contador-productos"></span>
                    </div>
                </div>
            </nav>
        </>
    )
}
