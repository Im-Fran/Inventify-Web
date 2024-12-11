import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
  validateStatus: (status) => status >= 200 && status < 300 || status === 422,
})

// const csrf = () => apiClient.get('/sanctum/csrf-cookie')
// window.axios = apiClient
// window.csrf_request = csrf

export {
  apiClient,
  apiUrl,
  // csrf,
}