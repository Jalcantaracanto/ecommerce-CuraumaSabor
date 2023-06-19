/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styles from '../styles/AgregarProducto.module.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { verProducto, modificarProducto } from '../services/producto-service'

export const ModificarProducto = () => {
    const { id } = useParams()

    const [producto, setProducto] = useState({})

    const navigate = useNavigate()

    const tomarUnProductoServicio = () => {
        verProducto(id)
            .then((response) => {
                console.log(response.data.producto)
                setProducto(response.data.producto)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const modificarUnProductoServicio = (e) => {
        e.preventDefault()
        modificarProducto(id, producto)
            .then((response) => {
                console.log(response)
                navigate('/productos/lista-admin')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleInputChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        })
        console.log(e.target.value)
    }

    useEffect(() => {
        tomarUnProductoServicio()
    }, [])

    return (
        <>
            <form className={styles['formulario']} onSubmit={modificarUnProductoServicio}>
                <section>
                    <section>
                        <label htmlFor="">Nombre</label>
                    </section>
                    <section>
                        <input type="text" name="nombre" placeholder="Ingresa Nombre" value={producto.nombre} onChange={handleInputChange} disabled  />
                    </section>
                    <section>
                        <label htmlFor="">Precio</label>
                    </section>
                    <section>
                        <input type="text" name="precio" placeholder="Ingresa Precio" value={producto.precio} onChange={handleInputChange} />
                    </section>
                    <section>
                        <label htmlFor="">Descripción</label>
                    </section>
                    <section>
                        <textarea type="text" name="descripcion" placeholder="Ingresa Descripción" value={producto.descripcion} onChange={handleInputChange} />
                    </section>
                    {/* <div>
                        <label htmlFor="">Categoria</label>
                        <select name="categoria" onChange={handleInputChange}>
                            <option value="Pisco">Pisco</option>
                            <option value="Comida">Comida</option>
                            <option value="pack">Pack</option>
                        </select>
                    </div> */}
                    {/* <div controlId="formFile" className="mb-3">
                        <label htmlFor="">Imagen de Producto</label>
                        <input type="file" name="imagen"/>
                    </div> */}
                </section>
                <input type="submit" value="Modificar Producto" />
            </form>
        </>
    )
}
