import React from 'react'

export const FormularioRegistroUsuario = () => {
    return (
        <div>
            <h1>Formulario de Registro</h1>
            <form>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" name="firstName" placeholder="Ingrese su nombre" />
                <label htmlFor="apellido">Apelido:</label>
                <input type="text" name="lastName" placeholder="Ingrese su apellido" />
                <label htmlFor="email">Correo:</label>
                <input type="email" name="email" placeholder="Ingrese su email" />
                <h2>Direccion</h2>
                <label htmlFor="ciudad">ciudad:</label>
                <input type="text" name="ciudad" placeholder="Ingrese su ciudad" />
                <label htmlFor="calle">Calle:</label>
                <input type="text" name="calle" placeholder="Ingrese su calle" />
                <label htmlFor="numero">Numero:</label>
                <input type="text" name="numero" placeholder="Ingrese su numero" />
                <label htmlFor="telefono">Telefono:</label>
                <input type="text" name="telefono" placeholder="Ingrese su telefono" />
            </form>
        </div>
    )
}
