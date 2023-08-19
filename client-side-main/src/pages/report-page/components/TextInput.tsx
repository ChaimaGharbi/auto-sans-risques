import { useField, FieldProps } from '@formiz/core'
import If from 'app/shared/components/If'
import { useEffect, useMemo, useState } from 'react'
import { useCreateResponse, useResponse } from 'app/store/hooks'
import { useDebounce } from 'use-debounce'
import { BsCheckCircleFill as Saved } from 'react-icons/bs'
import { CgSpinner as Spinner } from 'react-icons/cg'

export default function TextInput(props: InputProps) {
  const response = useResponse(props.questionId)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (response) {
      setValue(response.reponse)
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
    if (debouncedValue && debouncedValue !== response?.reponse)
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
      <div className="rounded bg-[#F0F0F0] w-full p-4 text-sm flex items-center justify-between">
        <input
          className="bg-[#F0F0F0] placeholder-[#BFBFBF] focus:outline-none flex-1"
          value={value ?? ''}
          onChange={e => setValue(e.target.value)}
          id={id}
          type="text"
          placeholder={props.placeholder}
          aria-invalid={error}
          required
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
