import axios from 'axios'

const instance = axios.create({
    baseURL: 'xxxx'
})
instance.interceptors.response.use(res => {
    if (res.data.status == 'ok') {
        return res.data;
    } else {
        console.error('接口请求失败')
        return Promise.reject(res.statusText)
    }
}, error => {
    return Promise.reject(error)
})
export default instance