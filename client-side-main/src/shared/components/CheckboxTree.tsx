import { useState, useEffect } from 'react'
import {
  IoIosArrowForward as ExpandArrow,
  IoIosArrowDown as ExpandedArrow,
} from 'react-icons/io'
import If from './If'

type Mark = {
  id: string
  label: string
}

type CheckboxProps = {
  checked: boolean
  onChecked: () => void
  label: string
}

type Generators = (items: Mark[]) => { [key: string]: boolean }

type GroupedCheckboxesProps = {
  id: string
  label: string
  items: Mark[]
  onItemChecked: (rootId: string, itemId: string) => void
  onItemUnchecked: (rootId: string, itemId: string, itemsId: string[]) => void
  onCheckAll: (modelId: string, marksId: string[]) => void
  onUncheckAll: (modelId: string, marksId: string[]) => void
}

const uncheckedList: Generators = items =>
  items.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: false,
    }),
    {}
  )

const checkedList: Generators = items =>
  items.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: true,
    }),
    {}
  )

function Checkbox(props: CheckboxProps) {
  const { checked, onChecked, label } = props
  return (
    <div>
      <label className="flex items-center gap-x-1">
        <input type="checkbox" checked={checked} onChange={onChecked} />
        <span>{label}</span>
      </label>
    </div>
  )
}

const GroupedCheckboxes = (props: GroupedCheckboxesProps) => {
  const {
    onItemChecked,
    onItemUnchecked,
    label,
    items,
    id,
    onCheckAll,
    onUncheckAll,
  } = props
  const [checked, setChecked] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [listDetails, setListDetails] = useState(uncheckedList(items))

  const handleAllCheck = () => {
    if (checked) {
      setChecked(false)
      setListDetails(uncheckedList(items))
      onUncheckAll(
        id,
        items.map(item => item.id)
      )
    } else {
      setChecked(true)
      setListDetails(checkedList(items))
      onCheckAll(
        id,
        items.map(item => item.id)
      )
    }
  }

  const handleCheckItem = itemId => {
    if (listDetails[itemId]) {
      setListDetails({ ...listDetails, [itemId]: false })
      setChecked(false)
      onItemUnchecked(
        id,
        itemId,
        items.map(item => item.id)
      )
    } else {
      setListDetails({ ...listDetails, [itemId]: true })
      onItemChecked(id, itemId)
    }
  }

  return (
    <div>
      <button
        className="flex gap-x-1 items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <If test={expanded}>
          <ExpandedArrow />
        </If>
        <If test={!expanded}>
          <ExpandArrow />
        </If>
        {label}
      </button>

      <If test={expanded}>
        <div className="ml-5">
          <div>
            <label className="font-bold flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleAllCheck}
              />{' '}
              ALL
            </label>
          </div>

          {items.map(item => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={listDetails[item.id]}
              onChecked={() => handleCheckItem(item.id)}
            />
          ))}
        </div>
      </If>
    </div>
  )
}

// type props = Props = {
//   data: Mark[]
// }

const Icon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8574 16L6.85742 12H14.8574L10.8574 16ZM10.8574 4L6.85742 8H14.8574L10.8574 4Z"
      fill="#31373D"
    />
    <mask
      id="mask0_0_589"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="6"
      y="4"
      width="9"
      height="12"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8574 16L6.85742 12H14.8574L10.8574 16ZM10.8574 4L6.85742 8H14.8574L10.8574 4Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_0_589)">
      <rect
        width="21"
        height="21"
        transform="translate(0.857422)"
        fill="#637381"
      />
    </g>
  </svg>
)

const CheckboxTree = props => {
  const [open, setOpen] = useState(false)
  const [models, setModels] = useState<string[]>([])
  const [marks, setMarks] = useState<string[]>([])

  // FIXME:

  useEffect(() => {
    props.onChange(models, marks)
  }, [models, marks])

  const onCheckAll = (modelId: string, marksId: string[]) => {
    setModels([...new Set([...models, modelId])])
    const set = new Set(marks)
    marksId.forEach(id => set.delete(id))
    setMarks([...set])
  }

  const onUncheckAll = (modelId: string, marksId: string[]) => {
    const set = new Set(models)
    set.delete(modelId)
    setModels([...set])
    const _set = new Set(marks)
    marksId.forEach(id => _set.delete(id))
    setMarks([..._set])
  }

  const onItemChecked = (rootId: string, itemId: string) => {
    // TODO: Handle checking the last unchecked item
    setModels([...new Set([...models, rootId])])
    setMarks([...new Set([...marks, itemId])])
  }

  const onItemUnchecked = (
    rootId: string,
    itemId: string,
    itemsId: string[]
  ) => {
    if (models.includes(rootId)) {
      const set = new Set(models)
      set.delete(rootId)
      setModels([...set])
      const marksSet = new Set(itemsId)
      marksSet.delete(itemId)
      setMarks([...marksSet])
    } else {
      const set = new Set(models)
      set.delete(rootId)
      setModels([...set])
      const marksSet = new Set(marks)
      marksSet.delete(itemId)
      setMarks([...marksSet])
    }
  }

  // if root alresady checked where all children are unchecked then keep root and add all except me
  return (
    <>
      {open && (
        <div className="fixed inset-0" onClick={() => setOpen(false)}></div>
      )}
      <div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
          }}
          className="z-20 flex justify-between items-center border border-[#C4CDD5] w-full p-3 text-black  !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900 cursor-pointer"
        >
          <span>Marque / Modéle</span>
          <Icon />
        </button>

        {open && (
          <div className="relative w-full z-40">
            <div className="p-4 shadow-md rounded-md absolute top-4 bg-white w-full border">
              <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                {/* {JSON.stringify({ models })} */}
                {/* {JSON.stringify({ marks })} */}
                {props.data.map(item => (
                  <GroupedCheckboxes
                    onCheckAll={onCheckAll}
                    onUncheckAll={onUncheckAll}
                    onItemUnchecked={onItemUnchecked}
                    key={item.id}
                    id={item.id}
                    onItemChecked={onItemChecked}
                    label={item.label}
                    items={item.children}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/*

- checkAll
- uncheckAll

- checkAll
    - uncheckOne [NOPE: should keep the model and add all marks execpt me]
        - checkAll
        - uncheckAll



- checkOne
- uncheckOne
*/

export default CheckboxTree
