import Select from 'react-select'

const SelectComponent = ({ onChange, placeholder, choices }) => {
  return (
    <Select
      onChange={onChange}
      placeholder={placeholder}
      options={choices}
      styles={{
        menuList: defaults => ({
          ...defaults,
          fontSize: '0.875rem',
          fontWeight: 'normal',
          textTransform: 'uppercase',
        }),
        input: defaults => ({
          ...defaults,
          padding: '0rem',
          fontSize: '0.875rem',
          '::placeholder': {
            color: '#ADADAD !important',
          },
        }),
        control: defaults => ({
          ...defaults,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          fontSize: '0.875rem',
          padding: '0rem',
          margin: '0rem',
          height: '10px',
          ':hover': {
            outline: 'none',
          },
        }),
      }}
    />
  )
}

export default SelectComponent
