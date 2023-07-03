import { useEffect, useState } from 'react'
import Switch from 'react-switch'

export function Toggle({
  value,
  label,
  onChange,
  disabled,
}: {
  value?: boolean | null
  label: string
  onChange: (value: boolean) => void
  disabled?: boolean
}) {
  const [state, setState] = useState(value || false)

  useEffect(() => {
    setState(value || false)
  }, [value])

  const handleChange = v => {
    setState(v)
    onChange(v)
  }

  return (
    <div className="flex items-center space-x-3">
      <label>{label}</label>
      <>
        <Switch
          onChange={handleChange}
          checked={state}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#0CD45C"
          disabled={disabled}
        />
      </>
    </div>
  )
}
