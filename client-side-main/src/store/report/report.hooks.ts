import { useSelector, useDispatch } from 'react-redux'
import { actions, ReportsState } from '.'
import { ReservationsState } from '../reservations'
import { useCallback, useEffect, useState } from 'react'
import { uploadImagesToReport } from './report.service'

export const useGetQuestions = () => {
  const dp = useDispatch()
  useEffect(() => {
    dp(actions.getQuestions())
  }, [dp])

  const state = useSelector(
    (state: { reports: ReportsState }) => state.reports.questions
  )

  return {
    ...state,
  }
}

export const useUploadImagesToReport = () => {
  const dp = useDispatch()

  const rapportId = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.mission.data[0]?.rapportId
  )

  const state = useSelector(
    (state: { reports: ReportsState }) => state.reports.uploadImages
  )

  const upload = useCallback(
    data => {
      const files = new FormData()
      for (const file of data) {
        files.append('files', file)
      }
      if (rapportId) {
        dp(actions.uploadImages(rapportId, files))
      }
    },
    [rapportId]
  )

  return {
    upload,
    ...state,
  }
}

export const useReportImages = () => {
  const state = useSelector(
    (state: { reports: ReportsState }) => state.reports.rapport.data?.images
  )

  return state
}

export const useSubmitReport = () => {
  const dp = useDispatch()

  const rapportId = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.mission.data[0]?.rapportId
  )

  const submit = useCallback(() => {
    dp(actions.submitReport(rapportId))
  }, [rapportId])

  const state = useSelector(
    (state: { reports: ReportsState }) => state.reports.questions
  )

  return {
    submit,
    ...state,
  }
}

export const useGetResponses = () => {
  const dp = useDispatch()
  const rapportId = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.mission.data[0]?.rapportId
  )

  useEffect(() => {
    if (rapportId) dp(actions.getResponses(rapportId))
  }, [dp, rapportId])

  const state = useSelector(
    (state: { reports: ReportsState }) => state.reports.responses
  )

  return state
}

export const useResponse = questionId => {
  const rapportId = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.mission.data[0]?.rapportId
  )

  const state = useSelector((state: { reports: ReportsState }) => {
    return state.reports.responses.data?.find(
      response =>
        response.rapportId === rapportId && response.questionId === questionId
    )
  })

  return state
}

export const useCreateResponse = (categoryName, categoryId, question) => {
  const dp = useDispatch()

  const reservation = useSelector(
    (state: { reservations: ReservationsState }) => state.reservations.mission
  )

  const state = useSelector(
    (state: { reports: ReportsState }) => state.reports.createResponse
  )

  const createAnswer = useCallback(
    (reponse, comment) => {
      if (reservation.data.length > 0) {
        const rapportId = reservation.data[0].rapportId
        return dp(
          actions.createResponse(
            rapportId,
            categoryName,
            categoryId,
            question,
            reponse,
            comment
          )
        )
      }
      return () => {}
    },
    [reservation.data]
  )

  return { save: createAnswer, ...state }
}
