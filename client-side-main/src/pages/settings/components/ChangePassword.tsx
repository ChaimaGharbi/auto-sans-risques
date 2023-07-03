import Modal from './Modal'
import {
  validators,
  Input,
  Form,
  useForm,
  TextareaInput,
  FileInput,
  CollectionsInput,
  MarksAndModelInput,
} from './FormStructure'
import { useUpdatePassword } from 'app/store/hooks'
import { useEffect } from 'react'

const ChangePasswordModal = ({ open, onClose }) => {
  const form = useForm()

  const { updatePassword, loading, errors, done } = useUpdatePassword()

  useEffect(() => {
    if (done) {
      form.reset()
      onClose()
    }
  }, [done])

  const onSubmit = data => {
    updatePassword(data.old, data.new)
  }

  if (!open) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="!w-[90%] md:!w-1/2 lg:!w-1/3 xl:!w-1/4 z-[3000]"
    >
      <div className="bg-white rounded-md ">
        <div className="bg-primary rounded-t-md grid place-content-center p-3">
          <img src="/big-logo.svg" alt="Logo" className="h-20" />
        </div>
        <div className="rounded p-4 grid gap-y-4">
          <h1 className="font-medium text-xl text-center">
            Changer le mot de passe
          </h1>
          <Form form={form} onSubmit={onSubmit}>
            <Input
              // defaultValue={data?.fullName}
              name="old"
              type="password"
              label="Ancien mot de passe"
              placeholder="********"
              validations={[validators.required, validators.notJustSpaces]}
            />
            <Input
              name="new"
              type="password"
              label="Nouveau mot de passe"
              placeholder="********"
              validations={[validators.required, validators.notJustSpaces]}
            />
            <Input
              name="re-new"
              type="password"
              label="Confirmer le mot de passe"
              placeholder="********"
              validations={[
                validators.required,
                validators.notJustSpaces,
                validators.sameAs(form.values['new']),
              ]}
            />

            <div className="px-4">
              <p className="text-red-500 text-sm m-0 p-0">{errors}</p>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={onClose}
                className="button w-full md:w-[unset]"
                type="button"
              >
                Annuler
              </button>
              <button
                className="button w-full md:w-[unset] "
                style={{
                  gridRow: 1,
                }}
                type="submit"
                disabled={(!form.isValid && form.isSubmitted) || loading}
              >
                Sauvegarder
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default ChangePasswordModal
