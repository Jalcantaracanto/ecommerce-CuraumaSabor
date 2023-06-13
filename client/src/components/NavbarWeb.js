import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from '../styles/NavbarWeb.module.scss'
import bolsa from '../assets/icons/shopping-bag.svg'
import { CartContext } from '../context/CartProvider'
import { CartIcon } from '../assets/icons/Icons'

export const NavbarWeb = () => {
    const { limpiarCarro } = useContext(CartContext)

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
                    <NavLink to={'/productos/nuevo-producto'} className={styles['links']}>
                        Agregar Producto
                    </NavLink>
                </div>
                <div>
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
