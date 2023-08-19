import { FieldProps } from '@formiz/core'
import { HTMLInputTypeAttribute, useEffect, useMemo, useState } from 'react'

import DateInput from './DateInput'
import TextInput from './TextInput'
import RadioInput from './RadioInput'

export default function Input(props: InputProps) {
  if (props.type === 'radio') return <RadioInput {...props} />
  if (props.type === 'text') return <TextInput {...props} />
  if (props.type === 'date') return <DateInput {...props} />
  return null
}

interface InputProps extends FieldProps {
  type:
    | HTMLInputTypeAttribute
    | 'select'
    | 'textarea'
    | 'ville'
    | 'position'
  options?: { key: string; label: string }[]
  className?: string
  placeholder?: string
  label?: string
  categoryName?: string
  categoryId?: string
  questionId?: string
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  accept?: string
  value?: string | string[]
}
