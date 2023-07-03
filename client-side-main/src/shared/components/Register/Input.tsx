import { Formiz, useForm, FormizStep, useField, FieldProps } from '@formiz/core'
import { HTMLInputTypeAttribute, useMemo, useState } from 'react'
import If from '../If'
import { Radio } from 'antd'
import Governerates from '../Governerates'

export default function Input(props: Props) {
  const getMyCurrentLocation = () => {
    if (navigator)
      navigator.geolocation.getCurrentPosition(function (position) {
        const xy = [position.coords.latitude, position.coords.longitude]

        setValue(JSON.stringify(xy))
      })
    else {
    }
  }

  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])
  const required = useMemo(
    () =>
      props.validations?.some(v => v.message === 'Ce champ est obligatoire'),
    [props.validations]
  )

  if (props.type === 'hidden')
    return <input value={value ?? ''} id={id} type={props.type} />

  if (props.type === 'select')
    return (
      <div className="grid py-1 gap-1">
        <label htmlFor={id} className="font-semibold">
          {props.label} {!!required && ' *'}
        </label>
        <select
          value={value ?? ''}
          onChange={e => setValue(e.target.value)}
          id={id}
          // onBlur={() => setIsTouched(true)}
          aria-invalid={error}
          aria-required={!!required}
        >
          {props.options?.map(option => (
            <option value={option.key} key={option.key}>
              {option.label}
            </option>
          ))}
        </select>
        <If test={error}>
          <span className="text-red-500 text-xs">{errorMessage}</span>
        </If>
      </div>
    )

  if (props.type === 'textarea')
    return (
      <div>
        <textarea
          placeholder={`${props.placeholder} ${!!required && ' *'}`}
          className={`resize-none ${props.className}`}
          rows={props.rows}
          value={value ?? ''}
          onChange={e => setValue(e.target.value)}
          aria-invalid={error}
          aria-required={!!required}
        />
        <If test={error}>
          <span className="text-red-500 text-xs">{errorMessage}</span>
        </If>
      </div>
    )

  if (props.type === 'position')
    return (
      <div>
        {props.label && <label className="font-semibold">{props.label}</label>}
        <button onClick={getMyCurrentLocation} type="button" className="button">
          Choisissez Ma position actuelle
        </button>
        <input type="hidden" value={value ?? ''} />
        {value && (
          <>
            lat: {JSON.parse(value)[0] ?? ''} <br />
            lng: {JSON.parse(value)[1] ?? ''}
          </>
        )}

        <If test={error}>
          <span className="text-red-500 text-xs">{errorMessage}</span>
        </If>
      </div>
    )

  if (props.type === 'governerates')
    return (
      <div>
        <Governerates onChange={v => setValue(v)} />
        <If test={error}>
          <span className="text-red-500 text-xs">{errorMessage}</span>
        </If>
      </div>
    )

  if (props.type === 'radio')
    return (
      <div className="grid">
        {props.label && <label className="font-semibold">{props.label}</label>}
        <Radio.Group
          name="role"
          value={value ?? ''}
          onChange={e => setValue(e.target.value)}
        >
          {props.options?.map(option => (
            <Radio value={option.key} key={option.key}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>

        <If test={error}>
          <span className="text-red-500 text-xs">{errorMessage}</span>
        </If>
      </div>
    )

  return (
    <div>
      <input
        className={props.className}
        value={value ?? ''}
        onChange={e => setValue(e.target.value)}
        id={id}
        type={props.type}
        placeholder={`${props.placeholder} `}
        aria-invalid={error}
        aria-required={!!required}
      />
      <If test={error}>
        <span className="text-red-500 text-xs">{errorMessage}</span>
      </If>
    </div>
  )
}

interface Props extends FieldProps {
  type:
    | HTMLInputTypeAttribute
    | 'select'
    | 'textarea'
    | 'governerates'
    | 'position'
  label?: string
  options?: { key: string; label: string }[]
  rows?: number
  className?: string
  placeholder?: string
  id?:string
  style?
}
