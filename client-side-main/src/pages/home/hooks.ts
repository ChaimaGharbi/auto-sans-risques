import { useState, useEffect, useMemo } from 'react'

function range(start, end) {
  const result: number[] = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

export const useSearchForm = () => {
  const [position, setPosition] = useState({
    lat: '',
    lng: '',
  })

  const [address, setAddress] = useState('')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [model, setModel] = useState('')
  const [mark, setMark] = useState('')

  const handleChangeModels = ({ model, mark }) => {
    if (model) {
      setModel(model.value)
    }

    if (mark) {
      setMark(mark.value)
    }
  }

  const handleChangeInput = (address: string, lat?: number, lng?: number) => {
    setAddress(address)
    setPosition({
      lat: lat?.toString() || '',
      lng: lng?.toString() || '',
    })
  }

  const disabledStartDate = current => {
    if (current && current.valueOf() < endDate) {
      return false
    }
    return true
  }

  const handleStartDateChange = date => {
    setStartDate(date?.valueOf())
  }

  const handleEndDateChange = date => {
    setEndDate(date?.valueOf())
  }

  type Search = {
    lat?: string
    lng?: string
    startDate?: any
    endDate?: any
    address?: string
    model?: string
    mark?: string
  }

  const query = useMemo(() => {
    const search: Search = {}
    if (position.lat && position.lng) {
      search.lat = position.lat
      search.lng = position.lng
      search.address = address
    }

    if (startDate) {
      const date = new Date(startDate)
      const isoString = date.toISOString()
      search.startDate = isoString
    }

    if (endDate) {
      const date = new Date(endDate)
      const isoString = date.toISOString()
      search.endDate = isoString
    }

    if (model) {
      search.model = model
    }

    if (mark) {
      search.mark = mark
    }

    if (address) {
      search.address = address
    }

    return new URLSearchParams(search).toString()
  }, [startDate, endDate, position, mark, model])

  return {
    address,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    handleChangeInput,
    disabledStartDate,
    handleChangeModels,
    query,
  }
}
