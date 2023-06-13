import React from 'react'
import { FormularioProducto } from '../components/FormularioProducto'
import styles from '../styles/AgregarProducto.module.scss'

export const AgregarProducto = () => {
    return (
        <>
            <main className={styles['main-agregar-productos']}>
                <ul>
                    <div>
                        <FormularioProducto />
                    </div>
                </ul>
            </main>
        </>
    )
}
