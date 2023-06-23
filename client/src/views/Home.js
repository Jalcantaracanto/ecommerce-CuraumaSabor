/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { UserContext } from '../context/UserProvider'
import styles from '../styles/Home.module.scss'
import Cookies from 'js-cookie'

//Imagenes
import img1 from '../assets/home/01.jpeg'
import img2 from '../assets/home/02.jpeg'
import img3 from '../assets/home/03.jpeg'
import img4 from '../assets/home/04.jpeg'
import img5 from '../assets/home/05.jpeg'
import img6 from '../assets/home/06.jpeg'
import img7 from '../assets/home/07.jpeg'

//Material UI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export const Home = () => {
    const { setUsuario } = useContext(UserContext)
    var items = [
        {
            image: img3,
        },
        {
            description: '¡Los mejores Piscos que probaras en tu vida!',
            image: img1,
        },
        {
            description: '¡Pruebalos cuanto antes!',
            image: img2,
        },
    ]

    useEffect(() => {
        //Traer el token del usuario
        const userToken = Cookies.get('usertoken')
        if (userToken) {
            const decodedToken = decodeURIComponent(escape(atob(userToken.split('.')[1])))
            const { id, email, firstName, lastName, direccion, admin } = JSON.parse(decodedToken)

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
                conectado: true,
            })
        }
    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid md={2}></Grid>
                    <Grid md={8}>
                        <Carousel maxWidth="xs">
                            {items.map((item, index) => (
                                <Box
                                    sx={{
                                        width: 700,
                                        height: 300,
                                        backgroundColor: 'primary.dark',
                                        color: 'primary.contrastText',
                                        borderRadius: '16px',
                                    }}
                                    key={index}
                                >
                                    <img src={item.image} alt={item.name} className={styles['imagen']} />
                                    <p className={styles['texto-carrusel']}>{item.description}</p>
                                </Box>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid md={2}></Grid>
                    <Grid md={12}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            ¿Quienes somos?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            "Curauma Sabor comenzo como un emprendimiento familiar, con el objetivo de entregar un producto de calidad y con un sabor unico, en la región de Valparaiso en Curauma. Así fue como la consistencia y el sabor de nuestros piscos, nos llevo a expandirnos a toda la región, junto a la región metropolitana, donde hoy en día nos encontramos en distintos puntos de venta. Aun tenemos mucho por crecer, pero siempre manteniendo la calidad y el sabor de nuestros piscos."
                        </Typography>
                    </Grid>

                    <Grid md={12}>
                        <Carousel maxWidth="xs" indicators={false} autoPlay interval={10000}>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia sx={{ height: 300 }} image={img2} title="green iguana" />
                                    </Card>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia sx={{ height: 300 }} image={img3} title="green iguana" />
                                    </Card>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia sx={{ height: 300 }} image={img4} title="green iguana" />
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia sx={{ height: 300 }} image={img6} title="green iguana" />
                                    </Card>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia sx={{ height: 300 }} image={img7} title="green iguana" />
                                    </Card>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia sx={{ height: 300 }} image={img5} title="green iguana" />
                                    </Card>
                                </Grid>
                            </Grid>
                        </Carousel>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
