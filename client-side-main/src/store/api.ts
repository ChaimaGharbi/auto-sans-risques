import axios from 'axios'

export default axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    baseURL: process.env.BACKEND_URL,
})

export const getClient = () =>
  axios.create({
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      baseURL: process.env.BACKEND_URL,
  })
