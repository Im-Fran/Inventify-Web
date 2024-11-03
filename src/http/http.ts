import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

axios.defaults.baseURL = apiUrl
axios.defaults.withCredentials = true
axios.defaults.validateStatus = (status) => status >= 200 && status < 300 || status === 422

axios.interceptors.request.use(async (config) => {
  if (!config.url?.includes('/sanctum/csrf-cookie')) {
    try {
      const cookieResponse = await axios.get('/sanctum/csrf-cookie')
      console.log({cookieResponse})
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

export {
  axios,
  apiUrl,
}