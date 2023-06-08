import React from 'react'
import styles from '../styles/Login.module.scss'
import { FormularioLogin } from '../components/FormularioLogin'

export const Login = () => {
    return (
        <>
            <div className={styles['main-container']}>
                <div className={styles['form-container']}>
                    <FormularioLogin />
                </div>
            </div>
        </>
    )
}
