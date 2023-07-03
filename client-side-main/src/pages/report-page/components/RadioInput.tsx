import { useField, FieldProps } from '@formiz/core'
import If from 'app/shared/components/If'
import { Radio } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useCreateResponse, useResponse } from 'app/store/hooks'
import { useDebounce } from 'use-debounce'
import {BsCheckCircleFill as Saved} from 'react-icons/bs'
import {CgSpinner as Spinner} from 'react-icons/cg'

export default function RadioInput(props: InputProps) {
  const response = useResponse(props.questionId)
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState(false)
  const [debouncedComment] = useDebounce(comment, 800)

  function onCommentChange(e) {
    setComment(e.target.value)
  }

  useEffect(() => {
    if (response) {
      setValue(response.reponse)
      setComment(response.comment)
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
      (debouncedValue && debouncedValue !== response?.reponse) ||
      (debouncedComment && debouncedComment !== response?.comment)
    )
      save(debouncedValue, debouncedComment)
  }, [debouncedValue, debouncedComment])

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="uppercase font-black font-roboto text-xs text-[#D4D9DD]"
        >
          Choisir une option
        </label>
        <div className="h-5">
          <If test={!!value && loading !== null}>
            <If test={loading && questionId === props.questionId}>
              <Spinner className="w-5 h-5 animate-spin" />
            </If>
            <If test={!(loading && questionId === props.questionId)}>
              <Saved className="text-green-400 w-5 h-5" />
            </If>
          </If>
        </div>
      </div>
      <Radio.Group
        name="role"
        value={value ?? ''}
        onChange={e => setValue(e.target.value)}
        className="grid"
      >
        {props.options?.map(option => (
          <div className="grid py-2" key={option.key}>
            <Radio value={option.key} className="flex  font-roboto">
              {option.label}
            </Radio>
          </div>
        ))}
      </Radio.Group>
      <If test={error}>
        <span className="text-red-500 text-xs block mt-4">{errorMessage}</span>
      </If>
      <div className="mt-4 grid gap-2">
        <label
          htmlFor={id}
          className="uppercase font-black font-roboto text-xs text-[#D4D9DD]"
        >
          Commentaire
        </label>
        <input
          className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none disabled:bg-opacity-50"
          onChange={onCommentChange}
          value={comment}
          type="text"
          disabled={!debouncedValue}
        />
      </div>
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
