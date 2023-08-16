import { HTMLInputTypeAttribute, useState } from 'react'
import { validators, Input, Form, useForm } from './FormStructure'
import { useGetUser, useUpdateExpert } from 'app/store/hooks'
import ChangePasswordModal from './ChangePassword'

export default function ClientsForm() {
  const {
    me: { data },
  } = useGetUser()
  const [open, setOpen] = useState(false)

  const { update, loading } = useUpdateExpert()
  const form = useForm()

  function onSubmit(_data) {
    update('client', _data)
  }
  if (!data) return null

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <div>
          <div className="grid content-start">
            <Input
              defaultValue={data?.fullName}
              name="fullName"
              type="text"
              label="Nom &#38; Prénom"
              placeholder="Mondher Lasmer"
              validations={[validators.required, validators.notJustSpaces]}
            />

            <Input
              defaultValue={data?.tel}
              name="tel"
              type="tel"
              label="Tél"
              placeholder="55555555"
              validations={[validators.required, validators.phone]}
            />
            <Input
              defaultValue={data?.address}
              name="adresse"
              type="text"
              label="Adresse"
              placeholder="Hay El Amal Fouchena"
              validations={[validators.required, validators.notJustSpaces]}
            />

            <Input
              defaultValue={data?.ville ? data?.ville : data?.gouv}
              name="ville"
              type="text"
              label="Gouvernorat"
              placeholder="Tunis"
              validations={[validators.required, validators.notJustSpaces]}
            />
          </div>
          <div className="p-4 col-span-1 md:col-span-2 items-center md:justify-between grid md:flex gap-2">
            <button
              className="button w-full md:w-[unset]"
              type="button"
              onClick={() => setOpen(true)}
            >
              Modifier mot de passe
            </button>
            <button
              className="button w-full md:w-[unset] "
              style={{
                gridRow: 1,
              }}
              type="submit"
              disabled={(!form.isValid && form.isSubmitted) || loading}
            >
              Sauvegarder les changement
            </button>
          </div>
        </div>
      </Form>
      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
