import axios from 'axios'


export default axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

export const getClient = () =>
  axios.create({
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      baseURL: import.meta.env.VITE_BACKEND_URL,
  })
