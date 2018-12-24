import axios from 'axios'
// import router from './../router'
axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.API_ROOT
// axios.defaults.withCredentials = true
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data)
    // config.headers = {
    //   'Access-Control-Allow-Credentials': true,
    //   'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
    //   'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    //   'Access-Control-Allow-Origin': 'http://localhost:8080'
    // }
    // if(token){
    //   config.params = {'token':token}
    // }
    console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    // if (response.data.errCode === 2) {
    //   router.push({
    //     path: '/login',
    //     querry: {redirect: router.currentRoute.fullPath}
    //   })
    // }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
       return resolve(response.data)
      })
      .catch(err => {
        return reject(err)
      })
  })
}
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
