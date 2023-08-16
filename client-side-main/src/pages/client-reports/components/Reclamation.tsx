import If from 'app/shared/components/If'
import { Formiz, useForm, FormizStep, useField, FieldProps } from '@formiz/core'
import { useState } from 'react'
import Input from 'app/shared/components/Register/Input'
import * as validators from 'app/shared/components/Register/validators'
import { useGetUser, useCreateReclamation } from 'app/store/hooks'

export default function Reclamation({ expertId, reservationId }) {
  const form = useForm()
  const { me } = useGetUser()
  const { loading, createReclamation, openModal, closeModal, open } =
    useCreateReclamation()

  const handleSubmit = data => {
    createReclamation({
      ...data,
      clientId: me.data?._id,
      expertId,
      reservationId,

      // YEA I HONESTLY DON'T CARE AT THIS POINT,
      // WHY REQUESTING SUCH INFOS SINCE YOU KNOW THE CLIENT
      // AND WHY YOU ARE DOING LIKE THAT IN THE BACKEND
      fullName: '',
      email: 'null@nil.no',
      tel: '',
    })
  }
  return (
    <>
      <button
        className="uppercase flex items-center gap-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-[#AFAFAF] text-white text-xs font-rubik"
        style={{
          boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
        }}
        onClick={openModal}
      >
        Donner une reclamation
      </button>
      <If test={open}>
        <div
          className="fixed inset-0 bg-black/80 z-[2002]"
          onClick={closeModal}
        />
        <div className="rounded-md  fixed w-[80%] md:w-1/2 !top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2003] bg-white">
          <div className="grid gap-y-2 p-4 md:p-10">
            <h1 className="font-bold text-center text-xl">
              Donner une reclamation
            </h1>
            <Formiz connect={form} onValidSubmit={handleSubmit}>
              <form
                noValidate
                onSubmit={form.submit}
                className="p-4 grid gap-4"
              >
                <Input
                  name="title"
                  className="relative rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  type="text"
                  placeholder="Titre"
                  validations={[
                    validators.required,
                    validators.pattern(/^[^A-Za-z0-9]*[A-Za-z0-9][\w\W]*/),
                  ]}
                />
                <Input
                  name="description"
                  className="relative rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  type="textarea"
                  placeholder="Description"
                  validations={[
                    validators.required,
                    validators.pattern(/^[^A-Za-z0-9]*[A-Za-z0-9][\w\W]*/),
                  ]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <button
                    disabled={loading}
                    onClick={closeModal}
                    className="button bg-[#F0F0F0] text-black shadow-none hover:text-black"
                  >
                    Annuler
                  </button>
                  <button className="button" disabled={loading}>
                    Valider
                  </button>
                </div>
              </form>
            </Formiz>
          </div>
        </div>
      </If>
    </>
  )
}
