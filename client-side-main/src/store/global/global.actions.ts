import { async } from 'app/store/utils'

export const constants = {
  SELECT_AMOUNT: 'SELECT_AMOUNT',
  PAY_WITH_CARD: 'PAY_WITH_CARD',
  PAY_WITH_TRANSFER: 'PAY_WITH_TRANSFER',
  GET_ALL_PACKS: async('GET_ALL_PACKS'),
}

export const select = i => ({
  type: constants.SELECT_AMOUNT,
  payload: i,
})

export const payWithCard = () => ({
  type: constants.PAY_WITH_CARD,
})

export const payWithTransfer = () => ({
  type: constants.PAY_WITH_TRANSFER,
})

export const getAllPacks = () => ({
  type: constants.GET_ALL_PACKS.request,
})
