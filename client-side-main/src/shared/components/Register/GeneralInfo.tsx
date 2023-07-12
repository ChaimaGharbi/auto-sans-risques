import { FormizStep, useField, FieldProps } from '@formiz/core'
import Input from './Input'
import * as validators from './validators'

export default function GeneralInfo() {
  return (
    <FormizStep name="general-info">
      <div className="grid gap-y-4">
        <Input
          placeholder="Nom et Prenom"
          type="text"
          name="fullName"
          validations={[validators.required, validators.pattern(/.*[a-z][A-Z]*/)]}
          className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
        />

        <Input
          placeholder="Tel"
          type="tel"
          name="tel"
          validations={[validators.required, validators.pattern(/^[0-9]{8}$/)]}
          className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
        />

        <Input
          placeholder="Email"
          type="email"
          name="email"
          validations={[validators.required, validators.email]}
          className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
        />

        <Input
          placeholder="Mot de passe"
          type="password"
          name="password"
          validations={[validators.required]}
          className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
        />
      </div>
    </FormizStep>
  )
}
