import axios from 'axios'

export const login = (usuario) => axios.post('http://localhost:8080/api/user/login', usuario, { withCredentials: true })

export const logout = () => axios.post('http://localhost:8080/api/user/logout', {}, { withCredentials: true })
