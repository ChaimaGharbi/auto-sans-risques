import axios from 'axios'

export default axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8003'
      : // : 'https://ktk-fc.herokuapp.com/',
        'https://api.auto-sans-risque.com',
})

export const getClient = () =>
  axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8003'
        : // : 'https://ktk-fc.herokuapp.com/',

          'https://api.auto-sans-risque.com',
  })
