import React, { useState, useEffect } from 'react'
import { verProductos, eliminarProducto } from '../services/producto-service'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Link } from 'react-router-dom'

export const ListadoAdministrador = () => {
    const [productos, setProductosList] = useState([])

    const mostrarProductosServicio = () => {
        verProductos()
            .then((response) => {
                setProductosList(response.data.productos)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const eliminarProductoServicio = async (id) => {
        try {
            await eliminarProducto(id)
            const newList = productos.filter((producto) => producto._id !== id)
            setProductosList(newList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        mostrarProductosServicio()
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Detalle</TableCell>
                            <TableCell align="right">Comandos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {producto.nombre}
                                </TableCell>
                                <TableCell align="right">{`$${producto.precio}`}</TableCell>
                                <TableCell align="right">{producto.descripcion}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Link to={`detalle/${producto._id}`}>
                                            <Button>Editar</Button>
                                        </Link>
                                        <Button onClick={() => eliminarProductoServicio(producto._id)}>Eliminar</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
