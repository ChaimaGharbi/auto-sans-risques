import axios from 'axios'

export default axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://157.230.103.28:8080'
      : // : 'https://ktk-fc.herokuapp.com/',
        'https://157.230.103.28:8080',
})

export const getClient = () =>
  axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'https://157.230.103.28:8080'
        : // : 'https://ktk-fc.herokuapp.com/',

          'https://157.230.103.28:8080',
  })
