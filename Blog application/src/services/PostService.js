
import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const api = axios.create({
    baseURL: BASE_URL,

})


class PostService
{
    getPosts(id){
        let params = new URLSearchParams([['userId', id]])
        return api.get('/posts',{params}).then((response)=>{
            
            return response.data
        })
    }
}

export default new PostService();
