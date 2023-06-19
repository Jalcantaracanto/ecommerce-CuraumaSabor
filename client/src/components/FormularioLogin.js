import React, { useState } from 'react'
import styles from '../styles/Login.module.scss'
import logo from '../assets/login/logo.png'
import { login } from '../services/user-service'
import { useNavigate } from 'react-router-dom'

export const FormularioLogin = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
        console.log(e.target.value)
    }

    const conectar = (e) => {
        e.preventDefault()
        try {
            login(user).then((response) => {
                console.log(response)
                navigate('/home')
            })
        } catch (error) {
            const myError = error.response.data.msg
            console.log(myError)
            setError(myError.title.message || '')
        }
    }

    return (
        <>
            <form className={styles['form-content']} onSubmit={conectar}>
                <div className={styles['top-content']}>
                    <h1 className={styles['form-title']}>Iniciar sesión</h1>
                    <img src={logo} alt="logo" />
                </div>

                <div className={styles['content']}>
                    <div>
                        <label htmlFor="">Correo:</label>
                    </div>
                    <div>
                        <input type="email" name="email" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="">Contraseña:</label>
                    </div>
                    <div>
                        <input type="password" name="password" onChange={handleChange} />
                    </div>
                    {error && <p>{error}</p>}
                    <div>
                        <input type="submit" value="Ingresar" />
                    </div>
                </div>
            </form>
        </>
    )
}
