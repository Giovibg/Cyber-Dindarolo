import axios from 'axios'

const baseURL = 'http://192.168.178.106:80/'


const APIrequest = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

APIrequest.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      
        if (error.response.status === 401 && originalRequest.url === baseURL+'api/refresh/') {
            window.location.href = '/#/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") {

                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return APIrequest
                    .post('/api/refresh/', {refresh: refreshToken})
                    .then((response) => {
        
                        localStorage.setItem('access_token', response.data.access);
                        //localStorage.setItem('refresh_token', response.data.refresh);
        
                        APIrequest.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
        
                        return APIrequest(originalRequest);
                    })
                    .catch(err => {
                        console.log(err)
                    });
                }else{
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = '/#/login';
                }
            }else{
                console.log("Refresh token not available.")
                window.location.href = '/#/login';
            }
        }      
        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);


export default APIrequest