import { useSelector, useDispatch } from 'react-redux'
import { actions, ExpertsState } from '.'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { AuthenticationState } from '../auth'

export const useGetTopExperts = () => {
  const state = useSelector(
    (state: { experts: ExpertsState }) => state.experts.top
  )
  const dp = useDispatch()
  const getTopExperts = () => dp(actions.topExperts())

  useEffect(() => {
    getTopExperts()
  }, [])

  return state
}

export const useMoreReviews = () => {
  const dp = useDispatch()
  const getMoreReviews = () => dp(actions.getMoreReviews())
  return getMoreReviews
}

export const useLoadExpert = () => {
  const { id } = useParams()

  const dp = useDispatch()

  const reviewLimit = useSelector(
    (state: { experts: ExpertsState }) => state.experts.reviews.limit
  )

  const getExpert = () => dp(actions.getExpert(id))
  const getReviews = () => dp(actions.getReviews(id, reviewLimit))

  useEffect(() => {
    getExpert()
  }, [])

  useEffect(() => {
    getReviews()
  }, [reviewLimit])
}

export const useGetExpert = () => {
  const state = useSelector(
    (state: { experts: ExpertsState }) => state.experts.expert
  )
  return state
}

export const useGetReviews = () => {
  const state = useSelector(
    (state: { experts: ExpertsState }) => state.experts.reviews
  )
  return state
}

export const useGetMyReviews = () => {
  const dp = useDispatch()
  const me = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.me
  )

  const getMyReviews = () => {
    dp(actions.getReviews(me.data?._id, 5))
  }

  useEffect(() => {
    if (me.data?._id) {
      getMyReviews()
    }
  }, [me.data])
}

export const useCreateReservation = () => {
  const { id } = useParams()
  const dp = useDispatch()
  const { state, me } = useSelector(
    (state: { experts: ExpertsState; auth: AuthenticationState }) => ({
      state: state.experts.reservation,
      me: state.auth.me.data,
    })
  )

  const createReservation = data =>
    dp(
      actions.createReservation({
        expertId: id,
        clientId: me?._id,
        ...data,
      })
    )

  return {
    state,
    createReservation,
  }
}

export const useGetExperts = () => {
  const dp = useDispatch()
  const state = useSelector(
    (state: { experts: ExpertsState }) => state.experts.searchExperts
  )

  const query = useSearchParams()[0]

  const [address, setAddress] = useState(query.get('address'))
  const [sortField, setSortField] = useState('DEFAULT')
  const [filter, setFilter] = useState({
    lat: query.get('lat') ? Number(query.get('lat')) : undefined,
    lng: query.get('lng') ? Number(query.get('lng')) : undefined,
    dateRange: [query.get('startDate'), query.get('endDate')],
    specialite: '',
    fullName: query.get('fullName'),
    address: address,
  })

  const handleStartDateChange = d => {
    setFilter({ ...filter, dateRange: [d, filter.dateRange[1]] })
  }

  const handleEndDateChange = d => {
    setFilter({ ...filter, dateRange: [filter.dateRange[0], d] })
  }

  const sort = useCallback(per => {
    setSortField(per.value)
  }, [])

  const [model, setModel] = useState(query.get('model') || '')
  const [mark, setMark] = useState(query.get('mark') || '')

  const specialite = useMemo(() => {
    let specialitiesMarks: string[] = []
    if (mark) {
      specialitiesMarks = [mark]
    }
    let specialitiesModels: string[] = []

    if (model) {
      specialitiesModels = [model]
    }

    return {
      specialitiesMarks,
      specialitiesModels,
    }
  }, [mark, model])

  const searchExperts = () =>
    dp(
      actions.searchExperts({
        filter: {
          _id: '',
          repos: false,
          ...filter,
        },
        pageNumber: 1,
        pageSize: 10,
        sortField, // 'DEFAULT',
        sortOrder: 'desc',
        specialite,
      })
    )

  useEffect(() => {
    searchExperts()
  }, [sortField])

  const handleAddress = (address, lat, lng) => {
    alert('autocomplete')
    setAddress(address)
    setFilter({
      ...filter,
      lat: lat,
      lng: lng,
    })
  }

  const handleAddressChange = address => {
    setAddress(address)
    setFilter({
      ...filter,
      address: address,
    })
  }

  const handleFullName = fullName => {
    setFilter({
      ...filter,
      fullName,
    })
  }

  const handleSpecialiteChange = ({ mark, model }) => {
    if (mark) {
      setMark(mark.value)
    }
    if (model) {
      setModel(model.value)
    }
  }

  // TODO: PAGINATION

  return {
    filter: {
      ...filter,
    },
    state,
    sort,
    model,
    mark,
    handleFilter: searchExperts,
    handleAddress,
    handleAddressChange,
    handleFullName,
    handleSpecialiteChange,
    handleStartDateChange,
    handleEndDateChange,
    pagination: {
      total: state?.total,
      page: 1,
      onChange: () => {},
      pageSize: 3,
    },
  }
}
