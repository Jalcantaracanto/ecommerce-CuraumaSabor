import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { CartContext } from '../context/CartProvider'
import { logout } from '../services/user-service'
import { useNavigate } from 'react-router-dom'

// Material UI
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { List, ListItem } from '@mui/material'
import e from 'express'

const pages = ['Inicio', 'Productos', 'Administrador']
const admin = ['Nuevo Producto', 'Lista de Productos']

export const TestNav = () => {
    const { limpiarCarro } = useContext(CartContext)
    const { usuario, setUsuario } = useContext(UserContext)
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [anchorElAdmin, setAnchorElAdmin] = useState(null)
    const [anchorElCart, setAnchorElCart] = useState(null)

    const handleOpenAdminMenu = (event) => {
        setAnchorElAdmin(event.currentTarget)
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseAdminMenu = () => {
        setAnchorElAdmin(null)
    }

    const handleCloseNavMenu = () => {
        if (anchorElNav) {
            setAnchorElNav(null)
        }
        // Código para cerrar la lista del administrador si está abierta
        if (anchorElAdmin) {
            setAnchorElAdmin(null)
        }
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
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

    const listaAdmin = () => {
        navigate('/productos/lista-admin')
    }

    const crearProducto = () => {
        navigate('/productos/nuevo-producto')
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Curauma Sabor
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            onItemClick={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                                <List>
                                    <ListItem button onClick={home}>
                                        <Typography textAlign="center">Inicio</Typography>
                                    </ListItem>
                                    <ListItem button onClick={productos}>
                                        <Typography textAlign="center">Productos</Typography>
                                    </ListItem>
                                    {usuario.admin && (
                                        <ListItem button onClick={handleOpenAdminMenu}>
                                            <Typography textAlign="center">Administrador</Typography>
                                        </ListItem>
                                    )}
                                </List>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Curauma Sabor
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {usuario.admin === true ? (
                            <>
                                <Button>
                                    <Typography onClick={home} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        Inicio
                                    </Typography>
                                </Button>
                                <Button>
                                    <Typography onClick={productos} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        Productos
                                    </Typography>
                                </Button>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {usuario.admin === true ? (
                                        <>
                                            <Tooltip title="Open settings">
                                                <Typography onClick={handleOpenAdminMenu} sx={{ p: 0 }}>
                                                    Administrador
                                                </Typography>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElAdmin}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElAdmin)}
                                                onClose={handleCloseAdminMenu}
                                            >
                                                <List>
                                                    <ListItem button onClick={crearProducto}>
                                                        <Typography sx={{ p: 0 }}>Crear Producto</Typography>
                                                    </ListItem>
                                                    <ListItem button onClick={listaAdmin}>
                                                        <Typography sx={{ p: 0 }}>Lista Productos</Typography>
                                                    </ListItem>
                                                </List>
                                            </Menu>
                                        </>
                                    ) : (
                                        <>
                                            <Button>
                                                <Typography sx={{ p: 0 }}>Inicio </Typography>
                                            </Button>
                                            <Button>
                                                <Typography sx={{ p: 0 }}>Productos </Typography>
                                            </Button>
                                        </>
                                    )}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button>
                                    <Typography onClick={home} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        Inicio
                                    </Typography>
                                </Button>
                                <Button>
                                    <Typography onClick={productos} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        Productos
                                    </Typography>
                                </Button>
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="https://thumbs.dreamstime.com/b/shopping-cart-icon-flat-vector-round-button-clean-black-white-design-concept-isolated-illustration-minimal-simple-circle-frame-167076849.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <List>
                                <ListItem button>
                                    <Typography sx={{ p: 0 }}>Carro de Compras</Typography>
                                </ListItem>
                                <ListItem button>
                                    <Typography sx={{ p: 0 }}>Vaciar Carro</Typography>
                                </ListItem>
                            </List>
                        </Menu>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="https://png.pngtree.com/png-vector/20220628/ourlarge/pngtree-user-profile-avatar-vector-admin-png-image_5289693.png" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <List>
                                {usuario.conectado === true ? (
                                    <>
                                        <ListItem
                                            button
                                            onClick={() => {
                                                desconectar()
                                                handleCloseUserMenu()
                                            }}
                                        >
                                            <Typography sx={{ p: 0 }}>Desconectar</Typography>
                                        </ListItem>
                                    </>
                                ) : (
                                    <ListItem
                                        button
                                        onClick={() => {
                                            conectar()
                                            handleCloseUserMenu()
                                        }}
                                    >
                                        <Typography sx={{ p: 0 }}>Conectar</Typography>
                                    </ListItem>
                                )}
                            </List>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
