import { FormizStep, useField, FieldProps } from '@formiz/core'
import Input from './Input'
import * as validators from './validators'
import Governerates from '../Governerates'

export default function AddressInfo() {
  return (
    <FormizStep name="address">
      <div className="grid gap-y-4">
        <Input
          placeholder="Adresse"
          type="text"
          name="address"
          validations={[validators.required]}
          className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
        />

        <Input
          type="governerates"
          name="governerates"
          validations={[validators.required]}
        />
      </div>
    </FormizStep>
  )
}
