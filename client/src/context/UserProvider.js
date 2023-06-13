import React, { useState, useEffect } from 'react'

export const UserContext = React.createContext([])

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({
        id: '',
        correo: '',
        nombre: '',
        apellido: '',
        direccion: {
            calle: '',
            numero: '',
            ciudad: '',
            telefono: '',
        },
    })



    return (
        <UserContext.Provider
            value={{
                setUsuario,
                usuario
                
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
