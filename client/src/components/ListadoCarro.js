import React, { useContext } from 'react'
import { CartContext } from '../context/CartProvider'
import { UserContext } from '../context/UserProvider'
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom'

//Material UI
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

//sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const ListadoCarro = () => {
    const { usuario } = useContext(UserContext)
    const { carro, limpiarCarro } = useContext(CartContext)
    const navigate = useNavigate()

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#cecec7',
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }))

    const MySwal = withReactContent(Swal)

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }))

    // console.log(usuario)

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

            MySwal.fire({
                title: 'Compra realizada con Exito',
                icon: 'success',
                text: 'Le llegará un correo con el detalle de su compra, Muchas gracias por su compra.',
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/home')
                    limpiarCarro()
                }
            })
        } catch (error) {
            console.log(error)
            alert('Error al realizar la compra')
        }
    }

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid md={10}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Producto</StyledTableCell>
                                    <StyledTableCell align="right">Precio</StyledTableCell>
                                    <StyledTableCell align="right">Cantidad</StyledTableCell>
                                    <StyledTableCell align="right">Total</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {carro.map((item, index) => (
                                    <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {item.nombre}
                                        </TableCell>
                                        <TableCell align="right">{`$${item.precio}`}</TableCell>
                                        <TableCell align="right">{item.cantidad}</TableCell>
                                        <TableCell align="right">{`$${parseInt(item.precio * item.cantidad).toLocaleString()}`}</TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid sx={2} md={2}>
                    <Card variant="outlined" sx={{ minHeight: 450, minWidth: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" textAlign={'center'}>
                                Total del Carrito
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="h6" textAlign={'center'}>
                                {`$${calcularTotal()}`}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="medium" sx={{ minWidth: 150 }} onClick={comprar} color="success">
                                Comprar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
