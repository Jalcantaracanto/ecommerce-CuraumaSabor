import React from 'react'

export const FormularioProducto = () => {
    return (
        <>
            <form>
                <div>
                    <label htmlFor=''>Nombre</label>
                    <input type="text" placeholder="Ingresa Nombre" />
                </div>
                <div>
                    <label htmlFor=''>Precio</label>
                    <input type="text" placeholder="Ingresa Precio" />
                </div>
                <div>
                    <label htmlFor=''>Descripción</label>
                    <input type="text" placeholder="Ingresa Descripción" />
                </div>
                <div>
                    <label htmlFor=''>Categoria</label>
                    <select>
                        <option>Pisco</option>
                        <option>Comida</option>
                        <option>pack</option>
                    </select>
                </div>
                <div controlId="formFile" className="mb-3">
                    <label htmlFor=''>Imagen de Producto</label>
                    <input type="file" />
                </div>
                <input type="submit" value="Crear Producto" />
            </form>
        </>
    )
}
