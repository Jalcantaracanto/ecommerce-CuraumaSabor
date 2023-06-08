import React, { useEffect, useState } from 'react'
import { ListadoProducto } from '../components/ListadoProducto'
import { verProductos } from '../services/producto-service'

export const Productos = () => {
    const [productos, setProductosList] = useState([])
    const mostrarProductosServicio = () => {
        verProductos()
            .then((response) => {
                setProductosList(response.data.productos)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        mostrarProductosServicio()
    }, [])

    return (
        <>
            <div>
                <div className="row">
                    <div className="col">
                        <ListadoProducto productos={productos} />
                    </div>
                </div>
            </div>
        </>
    )
}
