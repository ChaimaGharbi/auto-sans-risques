import { FormizStep } from '@formiz/core'
import Input from './Input'
import * as validators from './validators'

export default function ExpertInfo({ matchRole }) {
  if (!matchRole) return null
  return (
    <FormizStep name="expert-info">
      <div className="grid gap-y-4">
        <Input
          placeholder="Specialité"
          type="text"
          name="specialite"
          validations={[validators.required]}
          className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
        />
        <Input
          type="position"
          name="position"
          validations={[validators.required]}
        />
      </div>
    </FormizStep>
  )
}
