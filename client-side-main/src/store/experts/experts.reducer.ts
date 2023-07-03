import { Reducer } from 'app/store/utils'
import { constants, ExpertsState } from '.'
import toast from 'react-hot-toast'
const initialState: ExpertsState = {
  searchExperts: {
    data: null,
    loading: false,
    errors: [],
    total: 0,
  },
  top: {
    data: [],
    loading: false,
    errors: [],
  },
  expert: {
    data: null,
    loading: false,
    errors: [],
  },
  reviews: {
    still: false,
    limit: 5,
    total: 0,
    avg: '',
    data: [],
    loading: false,
  },
  reservation: {
    loading: false,
    errors: [],
  },
}

export const expertsReducer = new Reducer(initialState)
  .on(constants.TOP_EXPERTS.request, state => {
    state.top.loading = true
    state.top.errors = []
  })
  .on(constants.TOP_EXPERTS.success, (state, action) => {
    state.top.loading = false
    state.top.data = action.payload
    state.top.errors = []
  })
  .on(constants.TOP_EXPERTS.failure, state => {
    state.top.loading = false
    state.top.errors = []
  })
  .on(constants.GET_EXPERT.request, state => {
    state.expert.loading = true
    state.expert.errors = []
  })
  .on(constants.GET_EXPERT.success, (state, action) => {
    state.expert.loading = false
    state.expert.data = action.payload
    state.expert.errors = []
  })
  .on(constants.GET_EXPERT.failure, state => {
    state.expert.loading = false
    state.expert.errors = []
  })
  .on(constants.GET_REVIEWS.request, state => {
    state.reviews.loading = true
  })
  .on(constants.GET_REVIEWS.success, (state, action) => {
    state.reviews.loading = false
    state.reviews.data = action.payload.avis
    state.reviews.total = action.payload.NumAvis

    if (action.payload.NumAvis > 0) {
      state.reviews.avg = (
        action.payload.avis
          ?.map(({ note }) => note)
          .reduce((a, b) => a + b, 0) / action.payload.NumAvis
      ).toFixed(2)
    } else {
      state.reviews.avg = '0'
    }
  })
  .on(constants.GET_REVIEWS.failure, state => {
    state.reviews.loading = false
  })
  .on(constants.CREATE_RESERVATION.request, state => {
    state.reservation.loading = true
    state.reservation.errors = []
  })
  .on(constants.CREATE_RESERVATION.success, state => {
    state.reservation.loading = false
    state.reservation.errors = []
    toast.success(
      'Votre demande de rendez-vous chez notre expert est envoyé, vous recevez la confirmation de notre expert.'
    )
  })
  .on(constants.CREATE_RESERVATION.failure, state => {
    state.reservation.loading = false
    state.reservation.errors = []
    toast.success('Une erreur est survenue')
  })
  .on(constants.SEARCH_EXPERTS.request, state => {
    state.searchExperts.loading = true
    state.searchExperts.errors = []
  })
  .on(constants.SEARCH_EXPERTS.success, (state, action) => {
    state.searchExperts.loading = false
    state.searchExperts.errors = []
    state.searchExperts.data = action.payload.entities
    state.searchExperts.total = action.payload.totalCount
  })
  .on(constants.SEARCH_EXPERTS.failure, state => {
    state.searchExperts.loading = false
    state.searchExperts.errors = []
  })
  .on(constants.ADD_REVIEW.success, (state, action) => {
    state.reviews.data?.push(action.payload)
  })
  .on(constants.FETCH_MORE_REVIEWS, state => {
    state.reviews.limit += 5
  })
  .get()
