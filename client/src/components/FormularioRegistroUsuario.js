import React, { useState } from 'react'
import { registro, login } from '../services/user-service'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpeg'
import styles from '../styles/Login.module.scss'

import { Grid, Box, FormControl, TextField, Stack, Button, Typography, Container } from '@mui/material'
import Swal from 'sweetalert2'

export const FormularioRegistroUsuario = () => {
    const [usuario, setUsuario] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        direccion: {
            ciudad: '',
            calle: '',
            numero: '',
            telefono: '',
        },
        admin: false,
    })

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const registroUsuarioServicio = (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log(usuario)
            registro(usuario)
                .then((response) => {
                    let timerInterval
                    Swal.fire({
                        title: 'Usuario Creado Exitosamente',
                        icon: 'success',
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        },
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })

                    setUsuario({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        direccion: {
                            ciudad: '',
                            calle: '',
                            numero: '',
                            telefono: '',
                        },
                        admin: false,
                    })
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo registrar el usuario',
                        text: 'Debe llenar todos los campos correctamente',
                    })
                })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!usuario.firstName) {
            newErrors.firstName = 'Ingrese su nombre'
        }

        if (!usuario.lastName) {
            newErrors.lastName = 'Ingrese su apellido'
        }

        if (!usuario.email) {
            newErrors.email = 'Ingrese su correo'
        }

        if (!usuario.direccion.ciudad) {
            newErrors.ciudad = 'Ingrese su ciudad'
        }

        if (!usuario.direccion.calle) {
            newErrors.calle = 'Ingrese su calle'
        }

        if (!usuario.direccion.numero) {
            newErrors.numero = 'Ingrese su número'
        } else if (!/^[0-9]+$/.test(usuario.direccion.numero)) {
            newErrors.numero = 'El número debe contener solo dígitos'
        }

        if (!usuario.direccion.telefono) {
            newErrors.telefono = 'Ingrese su teléfono'
        } else if (!/^[0-9]+$/.test(usuario.direccion.telefono)) {
            newErrors.telefono = 'El teléfono debe contener solo dígitos'
        }

        if (!usuario.password) {
            newErrors.password = 'Ingrese su contraseña'
        }

        if (!usuario.confirmPassword) {
            newErrors.confirmPassword = 'Confirme su contraseña'
        }

        if (usuario.password !== usuario.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        if (name.startsWith('direccion.')) {
            const direccionField = name.split('.')[1]
            setUsuario((prevUsuario) => ({
                ...prevUsuario,
                direccion: {
                    ...prevUsuario.direccion,
                    [direccionField]: value,
                },
            }))
        } else {
            setUsuario((prevUsuario) => ({
                ...prevUsuario,
                [name]: value,
            }))
        }
    }

    const conectar = (e) => {
        e.preventDefault()
        login(user)
            .then((response) => {
                console.log(response)
                navigate('/home')
            })
            .catch((error) => {
                const myError = error.response.data.msg
                console.log(myError)
                setError(myError)
            })
    }

    const handleChangeLogin = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
        console.log(e.target.value)
    }

    return (
        <Container sx={{ textAlign: 'center' }}>
            <Box sx={{ marginTop: 2, border: 1, borderRadius: 2, padding: 2 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={10} sm={12} m={2} mb={2}>
                        <img className={styles['logo-curauma']} src={logo} alt="logo" />
                    </Grid>

                    <Grid item xs={10} sm={6}>
                        <Typography>Conectate</Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <Typography>Registrate</Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <form onSubmit={conectar}>
                            <FormControl sx={{ width: '60%' }}>
                                <TextField name="email" type="email" variant="standard" color="secondary" label="Correo" value={user.email} fullWidth onChange={handleChangeLogin} />
                                <TextField name="password" type="password" variant="standard" color="secondary" label="Contraseña" value={user.password} fullWidth onChange={handleChangeLogin} />

                                <Typography style={{ color: 'red' }}>{error}</Typography>
                                <Button sx={{ marginTop: 2 }} variant="outlined" color="success" type="submit">
                                    Ingresar
                                </Button>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <form onSubmit={registroUsuarioServicio}>
                            <FormControl>
                                <Stack spacing={2} direction="row">
                                    <TextField name="firstName" type="text" variant="standard" color="secondary" label="Nombre" fullWidth onChange={handleOnChange} value={usuario.firstName} error={Boolean(errors.firstName)} helperText={errors.firstName} />
                                    <TextField name="lastName" type="text" variant="standard" color="secondary" label="Apellido" fullWidth onChange={handleOnChange} value={usuario.lastName} error={Boolean(errors.lastName)} helperText={errors.lastName} />
                                </Stack>
                                <TextField name="email" type="email" variant="standard" color="secondary" label="Correo" fullWidth onChange={handleOnChange} value={usuario.email} error={Boolean(errors.email)} helperText={errors.email} />
                                <Stack spacing={2} direction="row">
                                    <TextField name="direccion.ciudad" type="text" variant="standard" color="secondary" label="Ciudad" fullWidth onChange={handleOnChange} value={usuario.direccion.ciudad} error={Boolean(errors.ciudad)} helperText={errors.ciudad} />
                                    <TextField name="direccion.calle" type="text" variant="standard" color="secondary" label="Calle" fullWidth onChange={handleOnChange} value={usuario.direccion.calle} error={Boolean(errors.calle)} helperText={errors.calle} />
                                </Stack>
                                <Stack spacing={2} direction="row">
                                    <TextField name="direccion.numero" type="text" variant="standard" color="secondary" label="Número" fullWidth onChange={handleOnChange} value={usuario.direccion.numero} error={Boolean(errors.numero)} helperText={errors.numero} />
                                    <TextField name="direccion.telefono" type="text" variant="standard" color="secondary" label="Telefono" fullWidth onChange={handleOnChange} value={usuario.direccion.telefono} error={Boolean(errors.telefono)} helperText={errors.telefono} />
                                </Stack>
                                <TextField name="password" type="password" variant="standard" color="secondary" label="Contraseña" fullWidth onChange={handleOnChange} value={usuario.password} error={Boolean(errors.password)} helperText={errors.password} />
                                <TextField name="confirmPassword" type="password" variant="standard" color="secondary" label="Confirma Contraseña" fullWidth onChange={handleOnChange} value={usuario.confirmPassword} error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword} />
                                <Button sx={{ marginTop: 2 }} variant="outlined" color="secondary" type="submit">
                                    Registrar
                                </Button>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
