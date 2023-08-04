import { Button, Modal, Popover } from 'antd'
import If from 'app/shared/components/If'
import { useGetUser, useModels, useUpdateExpert } from 'app/store/hooks'
import { useEffect, useMemo, useState } from 'react'


export default function MarksPicker() {
  const [open, setOpen] = useState(false)

  return (
    <div className=" grid gap-2">
      <label htmlFor={'id'}>Spécialité</label>
      <button className="button" onClick={() => setOpen(true)} type="button">
        Choisir une marque
      </button>
      <If test={open}>
        <div
          className="fixed inset-0 bg-black/60 z-[2003]"
          onClick={() => setOpen(false)}
        ></div>
        <div className="rounded-md shadow p-4 fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  bg-white z-[2004]">
          <MarksInput  closeModal={() => setOpen(false)}  />
        </div>
      </If>
    </div>
  )
}

function MarksInput({closeModal}) {
  const { data, loading } = useModels()
  const { update } = useUpdateExpert()
  const { me } = useGetUser()

  const modelMarksFormat = () => {
    const ids = me?.data?.specialitiesModels?.map(model => model._id) || []
    const modelMarksIds = me?.data?.specialitiesMarks?.map(el => el._id)

    const test: any = {}
    ids.forEach((id, index) => {
      // const aa = id?.marks?.filter(mark =>
      //mark.includes(modelMarksIds.forEach(markf => markf))
      //)
      test[id] = modelMarksIds
    })

    return test
    /* 
    const newMarksArray = marks.map((marksArray: any) => {
      return ids.map((id: any, index: number) => {
        return marksArray[index] ? id : null
      })
    })

    const result = newMarksArray.reduce((acc: any, curr: any) => {
      curr.forEach((id: any, index: number) => {
        if (id) {
          if (!acc[id]) {
            acc[id] = []
          }
          acc[id].push(curr[index])
        }
      })
      return acc
    }, {})
    return result
    console.log(result) */
  }

  const [modelMarks, setModelMarks] = useState<{ [key: string]: string[] }>(
    modelMarksFormat
  )
  const [pickedModels, setPickedModels] = useState<string[]>(
    me?.data?.specialitiesModels?.map(model => model._id) || []
  )

  if (!data || loading) return null

  const handleModelPick = (modelId: string) => {
    setPickedModels(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }
  useEffect(() => {
    const filteredObject = Object.keys(modelMarks)
      .filter(key => pickedModels.includes(key))
      .reduce((acc, key) => {
        acc[key] = modelMarks[key]
        return acc
      }, {})
    setModelMarks(filteredObject)
  }, [pickedModels])

  const handleMarkPick = (modelId: string, markId: string) => {
    setModelMarks(prev => {
      const marks = prev[modelId] || []
      const updatedMarks = marks.includes(markId)
        ? marks.filter(id => id !== markId)
        : [...marks, markId]
      return {
        ...prev,
        [modelId]: updatedMarks,
      }
    })
  }
  const handleClick = () => {
    update('expert', {
      specialitiesModels: pickedModels,
      specialitiesMarks: Object.values(modelMarks).flat(),
    })
    closeModal(); 
  }

  return (
    <Popover className="grid grid-cols-2 gap-4 h-96 overflow-auto  scroll- w-96">
      <div>
        <h1 className="text-lg font-bold text-gray-900 mb-2">Modéles</h1>

        <div className="grid gap-y-1">
          {data.map(model => (
            <div
              className="flex items-center gap-x-1 px-2 py-1 border border-gray-400 rounded"
              key={model.id}
            >
              <input
                onChange={() => handleModelPick(model.id)}
                type="checkbox"
                name="model"
                value={model.id}
                checked={pickedModels.includes(model.id)}
              />
              <span className="relative -top-[1px]">{model.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-900 mb-2">
          Marques{' '}
          <span className="text-sm">
            {pickedModels.length > 0 && `(${pickedModels.length})`}
          </span>
        </h1>

        <div className="grid gap-y-1 capitalize">
          <If test={pickedModels.length === 0}>
            <div>choisissez un modèle pour voir les marques</div>
          </If>
          <If test={pickedModels.length !== 0}>
            {pickedModels.map(modelId => {
              const marks =
                data.find(item => item.id === modelId)?.children || []
              return (
                <div key={modelId}>
                  <h2 className="font-bold text-gray-700">{`${
                    data.find(item => item.id === modelId)?.label || ''
                  } (${marks.length})`}</h2>
                  {marks.map(mark => (
                    <div
                      key={mark.id}
                      className="flex items-center gap-x-1 px-2 py-1 border border-gray-400 rounded mr-5"
                    >
                      <input
                        onChange={() => handleMarkPick(modelId, mark.id)}
                        type="checkbox"
                        name={`mark-${modelId}`}
                        value={mark.id}
                        checked={
                          modelMarks[modelId]?.includes(mark.id) || false
                        }
                      />
                      <span className="relative -top-[1px]">{mark.label}</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </If>
        </div>
      </div>
      <Button className="fixed w-80 ml-8" type="primary" onClick={handleClick}>
        Enregistrer
      </Button>
    </Popover>
  )
}
