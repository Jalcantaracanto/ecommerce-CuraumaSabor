import React /*, { useContext, useEffect }*/ from 'react'
// import styles from '../styles/ListadoProducto.module.scss'
import { useCart } from '../hooks/useCart'
// import Cookies from 'js-cookie'
// import { UserContext } from '../context/UserProvider'

// Material UI
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

//sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const ListadoProducto = ({ productos }) => {
    // const { setUsuario } = useContext(UserContext)

    const { agregarProducto } = useCart()

    const MySwal = withReactContent(Swal)

    // console.log(carro)
    const handleSubmit = (e, producto) => {
        e.preventDefault()
        console.log('Datos del producto:', producto)
        agregarProducto({
            id: producto._id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
        })

        MySwal.fire({
            title: 'Producto agregado al carro',
            icon: 'success',
            text: 'El producto ha sido agregado exitosamente al carro de compras.',
            confirmButtonText: 'Aceptar',
        })
    }

    return (
        <>
            <Grid container spacing={2}>
                {productos.map((producto, index) => {
                    const ruta = producto.imagen.path
                    const cortar = ruta.split('\\').slice(-1)[0]
                    return (
                        <Grid xs={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia sx={{ height: 450 }} image={`http://localhost:8080/${cortar}`} title={producto.descripcion} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {producto.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {producto.descripcion}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        {`$${producto.precio}`}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }} className="centered-button">
                                    <Button onClick={(e) => handleSubmit(e, producto)} size="medium">
                                        Agregar al Carro
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
