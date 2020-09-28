import axios from 'axios'

const APIrequest = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
export default APIrequest