import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const api = axios.create({
    baseURL: BASE_URL,

})

class UserService {
     getUsers() {
        return api.get('/users').then((response)=>{ 
            console.log("in service")
            return response.data;
        })
        
    }
}

export default new UserService();