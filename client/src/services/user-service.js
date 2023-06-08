import axios from 'axios'

const login = (email, password) => {
    return axios.post('/api/user/login', { email, password }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data.catch((error) => {
            console.log(error)
        })
    })
}
