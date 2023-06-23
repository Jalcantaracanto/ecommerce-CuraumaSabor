import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/NavbarWeb.module.scss'
import { CartContext } from '../context/CartProvider'
import { logout } from '../services/user-service'
import { UserContext } from '../context/UserProvider'

//Material UI
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ButtonGroup from '@mui/material/ButtonGroup'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { Typography } from '@mui/material'

export const NavbarWeb = () => {
    const { limpiarCarro } = useContext(CartContext)
    const { usuario, setUsuario } = useContext(UserContext)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const desconectar = () => {
        logout()
            .then((response) => {
                console.log(response)
                setUsuario({
                    conectado: false,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const home = () => {
        navigate('/home')
    }

    const productos = () => {
        navigate('/productos/lista-productos')
    }

    const carroCompras = () => {
        navigate('/Carro-Compras')
    }

    const conectar = () => {
        navigate('/registro-usuario')
    }


    return (
        <>
            <nav className={styles['navbar']}>
                <Typography variant="h6" ml={10} style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}>
                    Curauma Sabor
                </Typography>
                <section>
                    <ButtonGroup variant="contained" spacing="0.5rem" aria-label="spacing button group">
                        <Button variant="contained" onClick={home}>
                            Home
                        </Button>
                        <Button variant="contained" onClick={productos}>
                            Productos
                        </Button>
                        {usuario.admin === true ? (
                            <>
                                <Button id="basic-button" variant="contained" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                                    Administrador
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <Link to={'/productos/nuevo-producto'} underline="none">
                                        <MenuItem onClick={handleClose}>Crear Producto</MenuItem>
                                    </Link>
                                    <Link to={'/productos/lista-admin'} underline="none">
                                        <MenuItem onClick={handleClose}>Ver Productos</MenuItem>
                                    </Link>
                                </Menu>
                            </>
                        ) : null}
                    </ButtonGroup>
                </section>
                <section>
                    {usuario.conectado === true ? (
                        <>
                            <Button variant="text" startIcon={<LogoutIcon />} onClick={desconectar}>
                                Salir
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="text" startIcon={<LoginIcon />} onClick={conectar}>
                                Entrar/Registro
                            </Button>
                        </>
                    )}

                    <ButtonGroup>
                        <Button variant="contained" onClick={limpiarCarro}>
                            Vaciar Carro
                        </Button>
                        <Button variant="contained" startIcon={<ShoppingBasketIcon />} onClick={carroCompras}>
                            Carro
                        </Button>
                    </ButtonGroup>
                </section>
            </nav>
        </>
    )
}
