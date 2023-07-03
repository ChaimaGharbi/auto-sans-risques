import { Formiz, useForm, FormizStep, useField, FieldProps } from '@formiz/core'
import If from 'app/shared/components/If'
import { Radio } from 'antd'
import { useMemo } from 'react'
import * as validations from 'app/shared/components/Register/validators'
import Input from './Input'

export default function Question({ type, q, choices: _choices, ...props }) {
  const choices = useMemo(() => {
    return _choices.filter(c => c.length > 0)
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 py-3">
      <div>
        <span className="font-roboto">{q}</span>
      </div>
      <div className="grid">
        <div className="grid ">
          <If test={choices.length === 0}>
            <Input
              placeholder="Entrez votre réponse"
              type={type.toLowerCase()}
              name="zzz"
              className=""
              validations={[validations.required]}
              categoryName={props.categoryName}
              categoryId={props.categoryId}
              questionId={props.questionId}
            />
          </If>
          <If test={choices.length !== 0}>
            <Input
              required
              type="radio"
              name="xyz"
              options={choices.map(choice => ({
                label: choice,
                key: choice,
              }))}
              className="!grid grid-cols-1 xss:grid-cols-5 text-center"
              validations={[validations.required]}
              categoryName={props.categoryName}
              categoryId={props.categoryId}
              questionId={props.questionId}
            />
          </If>
        </div>
      </div>
    </div>
  )
}

export function Inputx(props) {
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
            <Radio value={option.key}>{option.label}</Radio>
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
        placeholder={`${props.placeholder} ${!!required && ' *'}`}
        aria-invalid={error}
        aria-required={!!required}
      />
      <If test={error}>
        <span className="text-red-500 text-xs">{errorMessage}</span>
      </If>
    </div>
  )
}
