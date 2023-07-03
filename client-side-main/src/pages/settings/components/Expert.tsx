import { HTMLInputTypeAttribute, useState } from 'react'
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
import { useGetUser, useUpdateExpert, useUpdateToUpload } from 'app/store/hooks'
import ChangePasswordModal from './ChangePassword'
import { ImagePreviewProvider } from './image-preview-provider'
import MarksPicker from './MarksPicker'

export default function ExpertsForm() {
  const [open, setOpen] = useState(false)
  const {
    me: { data },
  } = useGetUser()
  const { update, loading } = useUpdateExpert()

  const form = useForm()

  function onSubmit(_data) {
    console.log(_data)
    update('expert', _data)
  }
  if (!data) return null

  return (
    <>
      <ImagePreviewProvider>
        <Form form={form} onSubmit={onSubmit}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="grid content-start">
                <Input
                  defaultValue={data?.fullName}
                  name="fullName"
                  type="text"
                  label="Nom &#38; Prénom"
                  placeholder="Mondher Lasmer"
                  validations={[validators.required, validators.notJustSpaces]}
                />
                <MarksPicker />

                {/*  <MarksAndModelInput
                  defaultModels={data?.specialitiesModels || []}
                  defaultMarks={data?.specialitiesMarks || []}
                  label="Spécialité1"
                  name="marksAndModels"
                /> */}
                <Input
                  defaultValue={data?.tel}
                  name="tel"
                  type="tel"
                  label="Tél"
                  placeholder="55555555"
                  validations={[validators.required, validators.phone]}
                />
                <Input
                  defaultValue={data?.email}
                  name="email"
                  type="email"
                  label="Email"
                  readonly
                  placeholder="johnDoe@gmail.com"
                  // validations={[validators.required, validators.email]}
                />
                <Input
                  defaultValue={data?.address}
                  name="adresse"
                  type="text"
                  label="Adresse"
                  placeholder="Hay El Amal Fouchena"
                  validations={[validators.required, validators.notJustSpaces]}
                />
                <TextareaInput
                  defaultValue={data?.propos}
                  name="propos"
                  label="Declaration Professionnelle"
                  placeholder="Responsable de Qualité"
                  validations={[validators.required, validators.notJustSpaces]}
                />
              </div>
              <div>
                <FileInput
                  name="cin"
                  label="Carte d'identité Nationale"
                  href={data.cin}
                />
                <FileInput
                  name="carteFiscale"
                  label="Carte d'identification fiscale"
                  href={data.carteFiscale}
                />
                <FileInput
                  name="photoAtelier"
                  label="Photo d'atelier"
                  href={data.photoAtelier}
                />
                <FileInput
                  name="diplome"
                  label="Diplome / Attestation"
                  href={data.diplome}
                />
                <FileInput
                  name="signature"
                  label="Signature"
                  href={data.signature}
                />
                <CollectionsInput
                  defaultValue={data?.certif}
                  name="certif"
                  label="Certifications"
                  placeholder="Certificat de qualité automobile"
                />
              </div>
              <div className="p-4 col-span-1 md:col-span-2 items-center md:justify-between grid md:flex gap-2">
                <button
                  onClick={() => setOpen(true)}
                  className="button w-full md:w-[unset]"
                  type="button"
                >
                  Modifier mot de passe
                </button>
                <button
                  className="button w-full md:w-[unset]"
                  type="submit"
                  style={{
                    gridRow: 1,
                  }}
                  disabled={(!form.isValid && form.isSubmitted) || loading}
                >
                  Sauvegarder les changement
                </button>
              </div>
            </div>
          </div>
        </Form>
      </ImagePreviewProvider>
      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
