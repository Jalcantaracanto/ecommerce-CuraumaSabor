import axios from 'axios'

//Listar Productos
export const verProductos = () => axios.get('http://localhost:8080/api/productos')
