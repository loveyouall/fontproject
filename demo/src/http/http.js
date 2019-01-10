import axios from 'axios'
// import { URLSearchParams } from 'url'
// import router from './../router'
import qs from 'qs'
axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.API_ROOT
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // console.log(config.data)
    }
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      // 'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    }
    // config.headers = {
    //   'Access-Control-Allow-Credentials': true,
    //   'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
    //   'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    //   'Access-Control-Allow-Origin': 'http://localhost:8080'
    // }
    // if(token){
    //   config.params = {'token':token}
    // }
    // console.log(config)
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
export function post (url, data) {
  return new Promise((resolve, reject) => {
    // var params = new URLSearchParams()
    // params.append('jdmc', 'hello jdmc你好')
    // params.append('jddm', '2')
    // data = camelToUnderLine(data)
    // let data = qs.stringify(data)
    // console.log(data)
    // console.log(qs.stringify())
    axios.post(url, {username: data.username, password: data.password, select: data.select}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      transformRequest: [function (data) {
        console.log(data)
        data = qs.stringify({
          username: JSON.stringify(data.username),
          password: JSON.stringify(data.password),
          select: JSON.stringify(data.select)
        })
        console.log(data.username)
        console.log(data)
        return data
      }]
    })
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
// function camelToUnderLine (obj) {
//   let newObj
//   if (Array.isArray(obj)) {
//     newObj = []
//     for (let i = 0; i < obj.length; i++) {
//       if (typeof obj[i] === 'object' && obj[i]) {
//         newObj[i] = camelToUnderLine(obj[i])
//       } else {
//         newObj[i] = obj[i]
//       }
//     }
//   } else {
//     newObj = {}
//     for (let key in obj) {
//       let newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
//       if (typeof obj[key] === 'object' && obj[key]) {
//         newObj[newKey] = camelToUnderLine(obj[key])
//       } else {
//         newObj[newKey] = obj[key]
//       }
//     }
//   }
//   return newObj
// }
