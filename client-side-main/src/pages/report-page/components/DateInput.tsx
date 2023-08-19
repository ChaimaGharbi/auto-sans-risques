import { useField, FieldProps } from '@formiz/core'
import If from 'app/shared/components/If'
import { useEffect, useMemo, useState } from 'react'
import Picker from 'app/shared/components/Datepicker'
import { useCreateResponse, useResponse } from 'app/store/hooks'
import { useDebounce } from 'use-debounce'
import { BsCheckCircleFill as Saved } from 'react-icons/bs'
import { CgSpinner as Spinner } from 'react-icons/cg'

export default function DateInput(props: InputProps) {
  const response = useResponse(props.questionId)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (response) {
      setValue(new Date(response.reponse))
      setEditing(false)
    }
  }, [response])

  const { save, loading, questionId } = useCreateResponse(
    props.categoryName,
    props.categoryId,
    props.questionId
  )

  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])

  const [debouncedValue] = useDebounce(value, 800)

  useEffect(() => {
    if (
      debouncedValue &&
      Number(debouncedValue) !== Number(new Date(response?.reponse))
    )
      save(debouncedValue, '')
  }, [debouncedValue])

  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className="uppercase font-black font-rubik text-xs text-[#D4D9DD]"
      >
        {props.label}
      </label>
      <div className="dt-picker-2 rounded bg-[#F0F0F0] w-full p-4 text-sm flex items-center justify-between">
        <Picker
          useClassName={false}
          className="font-rubik bg-[#F0F0F0] w-full text-sm placeholder-[#BFBFBF]! focus:outline-none!"
          value={value ?? ''}
          onChange={setValue}
          id={id}
          placeholder={props.placeholder}
          aria-invalid={error}
        />
        <If test={!!value}>
          <If test={editing || (loading && questionId === props.questionId)}>
            <Spinner className="w-5 h-5 animate-spin" />
          </If>
          <If test={!(loading && questionId === props.questionId)}>
            <Saved className="text-green-400 w-5 h-5" />
          </If>
        </If>
      </div>
      <If test={error}>
        <span className="text-red-500 text-xs">{errorMessage}</span>
      </If>
    </div>
  )
}

interface InputProps extends FieldProps {
  options?: { key: string; label: string }[]
  className?: string
  placeholder?: string
  label?: string
  categoryName?: string
  categoryId?: string
  questionId?: string
}
