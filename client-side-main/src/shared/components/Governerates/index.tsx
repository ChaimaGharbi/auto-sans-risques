import Select from 'react-select'

const Governerates = ({ onChange }) => {
  const options = ville.map(g => ({ value: g, label: g }))

  return (
    <Select
      onChange={v => {
        onChange(v?.value)
      }}
      placeholder="Ville"
      options={options}
      styles={{
        input: defaults => ({
          ...defaults,
          '::placeholder': {
            color: '#BFBFBF !important',
          },
        }),
        control: defaults => ({
          ...defaults,
          backgroundColor: '#F0F0F0',
          fontSize: '0.875rem',
          border: 'none',
          padding: '0.5rem',
          ':hover': {
            outline: 'none',
          },
        }),
      }}
    />
  )
}

const ville = [
  'Tunis',
  'Ariana',
  'Manouba',
  'Ben Arous',
  'Nabeul',
  'Bizerte',
  'Zaghouan',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Beja',
  'Jendouba',
  'ElKef',
  'Siliana',
  'Kairouan',
  'Sidi Bouzid',
  'Kasserine',
  'Gabes',
  'Medenine',
  'Gafsa',
  'Tozeur',
  'Tataouine',
  'Kebili',
]

export default Governerates
