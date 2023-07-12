import { useModels } from 'app/store/hooks'
import Select, { Options, components } from 'react-select'
import { useEffect, useMemo, useState } from 'react'
import { getClient } from 'app/store/api'

const getKey = (model, mark?) => JSON.stringify({ model, mark })

interface Props {
  id?: string | null
  defaultMark?: string | null
  defaultModel?: string | null
  onChange
  className
  bg?
  withBorders?
  components?
  isMulti?
}

interface ModelsInter {
  data?: object
  loading?: boolean
  errors?: string[]
}

export function MarksPicker({
  id,
  defaultMark = null,
  defaultModel = null,
  onChange,
  className,
  bg,
  withBorders = true,
  components = {},
  isMulti = false,
}: Props) {
  const [firstRender, setFirstRender] = useState(true)
  
 

  const [specialitiesMarks, setSpecialitiesMarks] = useState([]);
  const [specialitiesModels, setSpecialitiesModels] = useState<ModelsInter>({
    data: [], // Initialize data as an empty array or with the appropriate initial value
    loading: true,
    errors: [],
  });
  useEffect(() =>{
    async function fetchData() {
      const ress = await getClient().get(`/expert/${id}`);
      const { specialitiesMarks, specialitiesModels } = ress.data;
      console.log("ress",ress.data);
      
      const transformedSpecialitiesMarks = specialitiesMarks.map((specialityMark) => ({
        id: specialityMark._id,
        label: specialityMark.name,
        modelId: specialityMark.modelId,
      }));
      const transformedSpecialitiesModels = specialitiesModels.map((specialityModel) => ({
        id: specialityModel._id,
        label: specialityModel.name,
        children: specialitiesMarks
          .filter((specialityMark) => specialityMark.modelId === specialityModel._id)
          .map((specialityMark) => ({
            id: specialityMark._id,
            label: specialityMark.name,
          })),
      }));
      setSpecialitiesMarks(transformedSpecialitiesMarks);
      const state  = {data: transformedSpecialitiesModels, loading: false, errors: []}    
      setSpecialitiesModels(state)
    }
    if (id) {
      fetchData();
    }
  }, [])
  
  console.log(specialitiesModels);

  const models = id? specialitiesModels : useModels()
  

  const [model, setModel] = useState<any>(
    defaultModel ? { value: defaultModel } : null
  )
  const [mark, setMark] = useState<any>(
    defaultMark ? { value: defaultMark } : null
  )

  const modelsData = useMemo(
    () =>
      models.data.map(m => {
        return {
          value: m.id,
          label: m.label,
        }
      }),
    [models.data]
  )

  const onChangeModel = e => {
    setModel(e)
    onChange({ model: e })
    setFirstRender(false)
  }

  const onChangeMark = e => {
    setMark(e)
    onChange({ mark: e })
  }

  useEffect(() => {
    if (!firstRender) {
      setMark(null)
    }
  }, [model])

  const marksData = useMemo(() => {
    if (model) {
      const _model = models.data.find(m => m.id === model.value)
      if (_model)
        return _model.children.map(mr => {
          return {
            value: mr.id,
            label: mr.label,
          }
        })

      return []
    } else {
      return []
    }
  }, [model])

  const defaultModelOption = useMemo(() => {
    if (model) {
      const _model = models.data.find(m => m.id === model.value)
      if (_model)
        return {
          value: _model.id,
          label: _model.label,
        }
    }
    return null
  }, [model])

  const defaultMarkOption = useMemo(() => {
    if (mark) {
      const _mark = marksData.find(m => m.value === mark.value)

      if (_mark) return _mark
    }
    return null
  }, [mark])

  return (
    <div className={className}>
      <Select
        value={defaultModelOption}
        defaultValue={defaultModelOption}
        onChange={onChangeModel}
        isDisabled={modelsData?.length === 0}
        options={modelsData}
        placeholder="Marque"
        styles={{
          input: defaults => ({
            ...defaults,
            '::placeholder': {
              color: `#BFBFBF !important`,
            },
          }),
          control: defaults => ({
            ...defaults,
            background: bg
              ? bg
              : 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
            display: 'flex',
            //! it was 100
            zIndex: 29,
            padding: '0.3rem',
            color: '#000000',
            justifyContent: 'space-between',
            borderRadius: '0.375rem',
            alignItems: 'center',
            width: '100%',
            cursor: 'pointer',
            border: withBorders ? '1px solid #C4CDD5' : 'none',
            ':hover': {
              outline: 'none',
            },
          }),
          menu: defaults => ({
            ...defaults,
            zIndex: 100,
          }),
        }}
      />
      <Select
        onChange={onChangeMark}
        value={defaultMarkOption}
        defaultValue={defaultMarkOption}
        isDisabled={marksData?.length === 0}
        options={marksData}
        placeholder="Modèle"
        components={components}
        isMulti={isMulti}
        styles={{
          input: defaults => ({
            ...defaults,
            '::placeholder': {
              color: '#BFBFBF !important',
            },
          }),
          control: defaults => ({
            ...defaults,
            background: bg
              ? bg
              : 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
            display: 'flex',
            zIndex: 10,
            padding: '0.3rem',
            color: '#000000',
            justifyContent: 'space-between',
            borderRadius: '0.375rem',
            alignItems: 'center',
            width: '100%',
            cursor: 'pointer',
            border: withBorders ? '1px solid #C4CDD5' : 'none',
            ':hover': {
              outline: 'none',
            },
          }),
        }}
      />
    </div>
  )
}

export default function ModelsAndMarks({ onChange, multi = true }) {
  const models = useModels()

  //   specialitiesMarks
  //   specialitiesModels

  const data = useMemo(() => {
    const _models = models.data.map(m => {
      return {
        value: getKey(m.id),
        label: m.label,
      }
    })

    const _marks = models.data
      .map(m => {
        return m.children.map(mr => {
          return {
            value: getKey(m.id, mr.id),
            label: `${m.label} ${mr.label}`,
          }
        })
      })
      .reduce((acc, cur) => [...acc, ...cur], [])

    return [..._models, ..._marks]
  }, [models.data])

  return (
    <div>
      <Select
        onChange={onChange}
        options={data}
        placeholder="Marque / Modéle"
        isMulti={multi}
        styles={{
          input: defaults => ({
            ...defaults,
            '::placeholder': {
              color: '#BFBFBF !important',
            },
          }),
          control: defaults => ({
            ...defaults,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
            display: 'flex',
            zIndex: 20,
            padding: '0.3rem',
            color: '#000000',
            justifyContent: 'space-between',
            borderRadius: '0.375rem',
            alignItems: 'center',
            width: '100%',
            cursor: 'pointer',
            border: '1px solid #C4CDD5',
            ':hover': {
              outline: 'none',
            },
          }),
        }}
      />
    </div>
  )
}
