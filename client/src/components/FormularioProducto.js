import React, { useState } from 'react'
import styles from '../styles/AgregarProducto.module.scss'
import { agregarProducto } from '../services/producto-service'

export const FormularioProducto = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        imagen: null,
    })

    const handleInputChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        })
    }

    const agregarProductoServicio = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('nombre', producto.nombre)
        data.append('precio', producto.precio)
        data.append('descripcion', producto.descripcion)
        data.append('categoria', producto.categoria)
        data.append('imagen', producto.imagen)

        agregarProducto(data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const imagencita = (e) => {
        console.log(e.target.files[0])
        setProducto({ ...producto, imagen: e.target.files[0] })
    }

    return (
        <>
            <form className={styles['formulario']} onSubmit={agregarProductoServicio}>
                <section>
                    <section>
                        <label htmlFor="">Nombre</label>
                    </section>
                    <section>
                        <input type="text" name="nombre" placeholder="Ingresa Nombre" onChange={handleInputChange} />
                    </section>
                    <section>
                        <label htmlFor="">Precio</label>
                    </section>
                    <section>
                        <input type="text" name="precio" placeholder="Ingresa Precio" onChange={handleInputChange} />
                    </section>
                    <section>
                        <label htmlFor="">Descripción</label>
                    </section>
                    <section>
                        <textarea type="text" name="descripcion" placeholder="Ingresa Descripción" onChange={handleInputChange} />
                    </section>
                    {/* <div>
                        <label htmlFor="">Categoria</label>
                        <select name="categoria" onChange={handleInputChange}>
                            <option value="Pisco">Pisco</option>
                            <option value="Comida">Comida</option>
                            <option value="pack">Pack</option>
                        </select>
                    </div> */}
                    <div controlId="formFile" className="mb-3">
                        <label htmlFor="">Imagen de Producto</label>
                        <input type="file" name="imagen" onChange={imagencita} />
                    </div>
                </section>
                <input type="submit" value="Crear Producto" />
            </form>
        </>
    )
}
