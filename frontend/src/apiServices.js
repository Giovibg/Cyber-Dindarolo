import axios from 'axios'

const baseURL = 'http://localhost:8000/'


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
            error.response.statusText === "Unauthorized") 
            {
                
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
                   // window.location.href = '/#/login';
                }
        }      
      // specific error handling done elsewhere
      return Promise.reject(error);
    }
);

/*
APIrequest.interceptors.response.use(response => {
    return response;
}, err => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === baseURL+'api/refresh/') {
            window.location.href = '/register/';
            return Promise.reject(error);
        }
       /* const ref = localStorage.getItem("refresh_token")
        console.log("ref:"+ ref)
        if (ref === null){
            console.log("inside")
            window.location.href = '/#/hello/';
            return;
        }

/*
        if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
        {
            originalReq._retry = true;

            let res = fetch('http://localhost:8000/api/refresh/', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Device': 'device',
                    'Authorization': "Bearer " + localStorage.getItem('access_token')
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({
                    //access_token: localStorage.getItem("access_token"),
                    refresh: localStorage.getItem("refresh_token")
                }),
            }).then(res => res.json()).then(res => {
                console.log("response")
                console.log(res.access);
                localStorage.setItem('access_token', res.access);
                //this.setSession({access_token: res.access, refresh_token: res.refresh});
                originalReq.headers['Authorization'] = "Bearer " + res.access;
                originalReq.headers['Device'] = "device";


                return APIrequest(originalReq);
            });


            resolve(res);
        }


        return Promise.reject(err);
    });
});
*/
export default APIrequest