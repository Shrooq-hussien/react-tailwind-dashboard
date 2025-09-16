import axios from 'axios'
import { API_BASE } from './constants'
export const http = axios.create({ baseURL: API_BASE, timeout: 8000 })
http.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export function unwrap(promise) {
  return promise.then(res=>[res.data, null]).catch(err=>[null, err])
}
