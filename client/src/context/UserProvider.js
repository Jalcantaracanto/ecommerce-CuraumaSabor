import React, { useState } from 'react'

export const UserContext = React.createContext([])

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({
        id: '',
        correo: '',
        nombre: '',
        apellido: '',
        admin: false,
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
