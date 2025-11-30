
import axios from 'axios'
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  timeout: 90000
})
api.interceptors.request.use(cfg => {
  const t = (typeof window !== 'undefined') && localStorage.getItem('rp_token')
  if(t) cfg.headers.Authorization = 'Bearer ' + t
  return cfg
})
export default api
