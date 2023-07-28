import { Formiz, useField, FieldProps } from '@formiz/core'
import If from 'app/shared/components/If'
import { HTMLInputTypeAttribute, useEffect, useMemo, useState } from 'react'
export { useForm } from '@formiz/core'
export * as validators from 'app/shared/components/Register/validators'
import { MarksPicker } from 'app/shared/components/ModelsAndMarks'
import { components } from 'react-select'

import {
  AiFillPlusSquare as PlusIcon,
  AiFillMinusSquare as MinusIcon,
  AiOutlineCloudUpload as UploadIcon,
  AiFillCloseCircle as CloseIcon,
} from 'react-icons/ai'

import { BsArrowUpRightCircleFill as OpenLinkIcon } from 'react-icons/bs'
import { useGetUser, useUpdateToUpload } from 'app/store/hooks'
import { usePreview } from './image-preview-provider'
import toast from 'react-hot-toast'

export function Form({ children, form, onSubmit, ...props }) {
  return (
    <Formiz connect={form} onValidSubmit={onSubmit}>
      <form noValidate onSubmit={form.submit} {...props}>
        {children}
      </form>
    </Formiz>
  )
}

const CheckboxOption = props => {
  return (
    <div>
      <components.Option {...props}>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{' '}
          <label>{props.label}</label>
        </div>
      </components.Option>
    </div>
  )
}

export function MarksAndModelInput(props: MarksProps) {
  const [marks, setMarks] = useState(props.defaultMarks)
  const [models, setModels] = useState(props.defaultModels)

  const usersSpeciality = useMemo(() => {
    return models.map(model => {
      return {
        ...model,
        marks: model.marks
          .map(markId => {
            return marks.find(mark => mark._id === markId) ?? null
          })
          .filter(Boolean),
      }
    })
  }, [marks, models])

  const tags = useMemo(() => {
    let tags: { label; value; modelId; markId }[] = []
    usersSpeciality.forEach(model => {
      model.marks.forEach(mark => {
        tags.push({
          label: `${model.name} ${mark.name}`.trim(),
          modelId: model._id,
          markId: mark._id,
          value: `${model._id}${mark._id}`,
        })
      })
    })
    return tags
  }, [usersSpeciality])

  function pop(markId) {
    setMarks(marks.filter(mark => mark._id !== markId))
  }

  const { collection, add, current, onChangeCurrent } = useCollection([])

  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const [mark, setMark] = useState<null | string>(null)
  const [model, setModel] = useState<null | string>(null)

  const [data, setData] = useState({
    specialitiesModels: [],
    specialitiesMarks: [],
  })

  function onChangeMarks({ value, label }) {
    setMark(label)
  }

  function onChangeModels({ value, label }) {
    setModel(value)
  }

  return (
    <div className="p-4 grid gap-2">
      <label htmlFor={id}>{props.label}</label>
      <div className="flex items-center space-x-4">
        <MarksPicker
          className="grid gap-4 grid-cols-2 flex-1"
          onChange={v => {
            const { mark, model } = v
            if (mark) onChangeMarks(mark)
            if (model) onChangeModels(model)
          }}
          bg="#F0F0F0"
          withBorders={false}
          components={{ Option: CheckboxOption }}
        />
        <button type="button" className="text-3xl text-primary" onClick={add}>
          <PlusIcon />
        </button>
      </div>
      <div className="flex flex-wrap">
        {tags.map(tag => (
          <div
            key={tag.value}
            className="mr-2 mb-2 flex items-center space-x-2 px-2 py-1 border rounded-lg"
          >
            <span>{tag.label}</span>
            <button
              onClick={() => pop(tag.markId)}
              type="button"
              className="text-red-500 text-lg"
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Input(props: Props) {
  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])
  const required = useMemo(
    () =>
      props.validations?.some(v => v.message === 'Ce champ est obligatoire'),
    [props.validations]
  )
  console.log(props);
  

  return (
    <div className="p-4 grid gap-2">
      <label htmlFor={id}>
        {props.label} {!!required && ' *'}
      </label>
      <input
        className="bg-[#F0F0F0] w-full outline-none h-12 p-4 rounded"
        value={value ?? ''}
        onChange={e => setValue(e.target.value)}
        id={id}
        type={props.type}
        readOnly={props.readonly}
        placeholder={props.placeholder}
        aria-invalid={error}
        aria-required={!!required}
      />
      <If test={error}>
        <span className="text-red-500 text-xs">{errorMessage}</span>
      </If>
    </div>
  )
}

export function TextareaInput(props: Props) {
  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])
  const required = useMemo(
    () =>
      props.validations?.some(v => v.message === 'Ce champ est obligatoire'),
    [props.validations]
  )

  return (
    <div className="p-4 grid gap-2">
      <label htmlFor={id}>
        {props.label} {!!required && ' *'}
      </label>
      <textarea
        className="bg-[#F0F0F0] w-full outline-none h-40 p-4 rounded resize-none"
        value={value ?? ''}
        onChange={e => setValue(e.target.value)}
        id={id}
        placeholder={props.placeholder}
        aria-invalid={error}
        aria-required={!!required}
      />
      <If test={error}>
        <span className="text-red-500 text-xs">{errorMessage}</span>
      </If>
    </div>
  )
}

export function CollectionsInput(props: Props) {
  const { setValue, id } = useField(props)

  const { collection, onChangeCurrent, add, current, remove, onChange } =
    useCollection(props.defaultValue)


  useEffect(() => {
    setValue(collection)
  }, [collection])

  return (
    <>
      <div className="p-4 grid gap-2">
        <label htmlFor={id}>{props.label}</label>
        <div className="flex items-center space-x-3">
          <input
            id={id}
            value={current}
            onChange={onChangeCurrent}
            placeholder={props.placeholder}
            type="text"
            className="bg-[#F0F0F0] flex-1 outline-none h-12 p-4 rounded"
          />
          <button
            type="button"
            className="text-3xl text-primary disabled:opacity-50"
            onClick={add}
            disabled={!current}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      {collection.length > 0 &&
        collection.map((item, idx) => (
          <div className="px-4 pb-2 flex items-center space-x-3" key={idx}>
            <input
              value={item}
              onChange={onChange(idx)}
              type="text"
              className="bg-[#F0F0F0] flex-1 outline-none h-12 p-4 rounded"
            />
            <button
              type="button"
              className="text-3xl text-red-500"
              onClick={remove(idx)}
            >
              <MinusIcon />
            </button>
          </div>
        ))}
    </>
  )
}

function getFileName(fileName: string) {
  const parts = fileName.split('/')
  if (parts.length > 1) {
    const fn = parts[parts.length - 1].split('?')[0]

    if (fn.length > 20) {
      return fn.slice(0, 10) + '...' + fn.slice(-10)
    }

    return fn
  }
  return fileName
}

export function FileInput({
  name,
  label,
  href,
}: {
  name: string
  label: string
  href?: string
}) {
  const { setImage } = usePreview()
  const { me } = useGetUser()
  const { upload, loading } = useUpdateToUpload()
  const [v, setV] = useState('')

  function submitImage(e) {
    const file = e.target.files[0]

    // check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Le fichier doit être une image')
      return
    }

    const formData = new FormData()
    formData.append(name, file)
    upload(me.data?.role.toLowerCase(), formData)

    setV('')
  }

  return (
    <div className="p-4 grid gap-2">
      <span>{label}</span>
      <div className="grid sm:flex items-center">
        <label
          onChange={submitImage}
          className="flex-1 cursor-pointer text-[#9ca3af] bg-[#F0F0F0] w-full outline-none h-12 p-4  rounded"
        >
          <span className="flex items-center space-x-2 relative -top-[2px]">
            <UploadIcon className="text-xl" />
            <span className="p-0 m-0 relative -top-[1px]">
              {href ? getFileName(href) : 'Parcourir'}
            </span>
          </span>
          <input
            value={v}
            type="file"
            className="hidden h-0"
            disabled={loading}
            accept="image/*"
          />
        </label>
        <button
          type="button"
          onClick={() => setImage(href || '')}
          className="p-2 !text-white rounded-md bg-primary flex items-center justify-between"
        >
          <span className="text-white pr-4">Ouvrir le fichier</span>
          <OpenLinkIcon className="text-white text-xl" />
        </button>
      </div>
    </div>
  )
}

interface Props extends FieldProps {
  type?: HTMLInputTypeAttribute | 'select' | 'textarea'
  label?: string
  options?: { key: string; label: string }[]
  rows?: number
  className?: string
  placeholder?: string
  readonly?: boolean
  style?
}

interface MarksProps extends Props {
  defaultModels: any[]
  defaultMarks: any[]
}

function useCollection(defaults) {
  const [collection, setCollection] = useState<string[]>(defaults ?? [])
  const [current, setCurrent] = useState('')

  function onChangeCurrent(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrent(e.target.value)
  }

  function add() {
    if (current.trim()) {
      setCollection([...collection, current.trim()])
      setCurrent('')
    }
  }

  function remove(index: number) {
    return () => {
      setCollection(collection.filter((_, i) => i !== index))
    }
  }

  function onChange(index: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setCollection(
        collection.map((item, i) => {
          if (i === index) return e.target.value
          return item
        })
      )
    }
  }

  return {
    collection,
    current,
    onChangeCurrent,
    add,
    onChange,
    remove,
  }
}
