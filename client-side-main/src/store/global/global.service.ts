import { getClient } from 'app/store/api'

export const getAllPacks = () =>
  getClient()
    .get(`/pack`)
    .then(({ data }) => data)
