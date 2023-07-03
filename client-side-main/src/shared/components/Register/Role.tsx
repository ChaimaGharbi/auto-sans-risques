import { FormizStep, useField, FieldProps } from '@formiz/core'
import Input from './Input'
import * as validators from './validators'

export default function GeneralInfo() {
  return (
    <FormizStep name="role">
      <div className="grid gap-y-4">
        <Input
          placeholder="Role"
          label="Role"
          type="radio"
          name="role"
          validations={[validators.required]}
          options={[
            {
              key: 'CLIENT',
              label: 'Client',
            },
            {
              key: 'EXPERT',
              label: 'Expert',
            },
          ]}
        />
      </div>
    </FormizStep>
  )
}
