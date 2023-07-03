import { FormizStep, useField } from '@formiz/core'
import If from 'app/shared/components/If'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AiOutlineCloudUpload as UploadIcon } from 'react-icons/ai'
import { useReportImages, useUploadImagesToReport } from 'app/store/hooks'
export default function UploadImages() {
  return (
    <FormizStep name="Importer des images">
      <div className="grid gap-4 divide-y">
        <div className="grid py-3">
          <div>
            <span className="font-roboto px-10">
              Importer des images pour le véhicule
            </span>
          </div>
          <div className="grid">
            <FileInput
              name="files"
              className=""
              validations={[
                {
                  rule: (value: any) => {
                    return value && value.length > 0
                  },
                  message: 'Veuillez choisir au moins une image',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </FormizStep>
  )
}
function useFilePreview(v: any) {
  const [preview, setPreview] = useState<any[]>([])
  useEffect(() => {
    if (!v || !v.length) {
      setPreview([])
      return
    }
    let _previews: any[] = preview
    setPreview([])
    for (let file of v) {
      const reader = new FileReader()
      reader.onload = () => {
        // _previews.push(reader.result)
        _previews.push(URL.createObjectURL(file))
      }
      reader.readAsDataURL(file)
    }
    setPreview(_previews)
  }, [v])
  return preview
}
function UploadPlaceholder({ placeholder }: { placeholder: string }) {
  return (
    <div className="rounded-lg border-4 border-dotted p-10 flex flex-col items-center">
      <UploadIcon className="w-14 h-14 text-gray-500" />
      <span className="text-gray-500 font-medium">{placeholder}</span>
    </div>
  )
}
async function urlToImage(url) {
  const response = await fetch(url)
  const data = await response.blob()
  const randomName = Math.random().toString(36).substring(7)
  const file = new File([data], randomName, { type: 'image/png' })
  return file
}
export function FileInput(props) {
  const images = useReportImages()
  const uploader = useUploadImagesToReport()
  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)
  async function loadImages() {
    if (images) {
      let files: File[] = []
      for (let image of images) {
        const file = await urlToImage(image)
        files.push(file)
      }
      setValue(files)
    }
  }
  useEffect(() => {
    loadImages()
  }, [images])
  const preview = useFilePreview(value)
  const [error, setError] = useState(false)
  useEffect(() => {
    setError(!isValid && isSubmitted)
  }, [isValid, isSubmitted])

  const upload = useCallback(() => {
    uploader.upload(value)
  }, [value, uploader])
  return (
    <div className="">
      <div className="p-10">
        <label htmlFor={id} className="grid gap-2 ">
          <div
            className={`cursor-pointer input ${
              props.className ? props.className : ''
            }`}
          >
            {preview && preview.length > 0 ? (
              <div className="flex items-center flex-wrap">
                {preview.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    className="max-h-60 mx-auto"
                    alt="preview"
                  />
                ))}
              </div>
            ) : (
              <UploadPlaceholder
                placeholder={props.placeholder || 'Importer'}
              />
            )}
          </div>
          <input
            className={`hidden`}
            value={value?.filename ?? ''}
            onChange={e => {
              setValue(Array.from(e.target.files || []))
              uploader.upload(Array.from(e.target.files || []))
            }}
            id={id}
            type="file"
            disabled={props.disabled}
            multiple
            accept="image/*"
          />
          <If test={error}>
            <span className="text-red-500 text-xs">{errorMessage}</span>
          </If>
        </label>
      </div>
      <div className="flex items-center justify-end px-10 space-x-2">
        <button
          type="button"
          className="button bg-red-500"
          onClick={() => {
            // TODO: remove all images
            setValue([])
          }}
        >
          Supprimer les images
        </button>
      </div>
    </div>
  )
}
