import React from 'react'
import styles from '../styles/Login.module.scss'
import logo from '../assets/login/logo.png'

export const FormularioLogin = () => {
    return (
        <>
            <form className={styles['form-content']}>
                <div className={styles['top-content']}>
                    <h1 className={styles['form-title']}>Iniciar sesión</h1>
                    <img src={logo} alt="logo" />
                </div>

                <div className={styles['content']}>
                    <div>
                        <label htmlFor="">Correo:</label>
                    </div>
                    <div>
                        <input type="email" name="correo" />
                    </div>
                    <div>
                        <label htmlFor="">Contraseña:</label>
                    </div>
                    <div>
                        <input type="password" name="password" />
                    </div>
                    <div>
                        <input type="button" value="Ingresar" />
                    </div>
                </div>
            </form>
        </>
    )
}
