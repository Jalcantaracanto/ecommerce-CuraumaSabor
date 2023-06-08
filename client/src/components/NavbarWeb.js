import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from '../styles/NavbarWeb.module.scss'
import bolsa from '../assets/icons/shopping-bag.svg'
import { CartContext } from '../context/CartProvider'

export const NavbarWeb = () => {
    const { limpiarCarro } = useContext(CartContext)

    return (
        <>
            <nav className={styles['navbar']}>
                <h3>Curauma Sabor</h3>
                <div>
                    <NavLink to={'/home'} className={styles['links']}>Home</NavLink>
                    <NavLink to={'/Productos/lista-productos'} className={styles['links']}>Productos</NavLink>
                    <NavLink className={styles['links']}>Acerca de</NavLink>
                </div>
                <div>
                    <input type="button" value="Vaciar Carro" onSubmit={limpiarCarro} />
                    <Link to={'/Carro-Compras'}>
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
