import axios from 'app/store/api'
import { Body } from '.'

export const askForAssistance = (body: Body) =>
  axios.post(`/assistance`, body).then(({ data }) => data)
