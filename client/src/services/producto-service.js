import axios from 'axios'

//Listar Productos
export const verProductos = () => axios.get('http://localhost:8080/api/productos')

export const verAdmin = () => axios.get('http://localhost:8080/api/productos', { withCredentials: true })

export const agregarProducto = (producto) =>
    axios.post('http://localhost:8080/api/producto', producto, {
        withCredentials: true,
        headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data',
        },
    })

export const modificarProducto = (id, producto) => axios.put(`http://localhost:8080/api/producto/${id}`, producto, { withCredentials: true })

export const eliminarProducto = (id) => axios.delete(`http://localhost:8080/api/producto/${id}`, { withCredentials: true })

export const verProducto = (id) => axios.get(`http://localhost:8080/api/producto/${id}`, { withCredentials: true })

// export const numeroProducto = () => axios.get('http://localhost:8080/api/producto/lastImageNumber', { withCredentials: true })