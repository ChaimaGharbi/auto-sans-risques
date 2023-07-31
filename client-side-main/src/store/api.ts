import axios from 'axios'

export default axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : // : 'https://ktk-fc.herokuapp.com/',
        'http://149.202.50.65:8080',
})

export const getClient = () =>
  axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : // : 'https://ktk-fc.herokuapp.com/',

          'http://149.202.50.65:8080',
  })
