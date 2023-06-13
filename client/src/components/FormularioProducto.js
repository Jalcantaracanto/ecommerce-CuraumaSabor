import React from 'react'
import styles from '../styles/AgregarProducto.module.scss'

export const FormularioProducto = () => {
    return (
        <>
            <form className={styles['formulario']}>
                <section>
                    <section>
                        <label htmlFor="">Nombre</label>
                    </section>
                    <section>
                        <input type="text" placeholder="Ingresa Nombre" />
                    </section>
                    <section>
                        <label htmlFor="">Precio</label>
                    </section>
                    <section>
                        <input type="text" placeholder="Ingresa Precio" />
                    </section>
                    <section>
                        <label htmlFor="">Descripción</label>
                    </section>
                    <section>
                        <textarea type="text" placeholder="Ingresa Descripción" />
                    </section>
                    <div>
                        <label htmlFor="">Categoria</label>
                        <select>
                            <option>Pisco</option>
                            <option>Comida</option>
                            <option>pack</option>
                        </select>
                    </div>
                    <div controlId="formFile" className="mb-3">
                        <label htmlFor="">Imagen de Producto</label>
                        <input type="file" />
                    </div>
                </section>
                <input type="submit" value="Crear Producto" />
            </form>
        </>
    )
}
