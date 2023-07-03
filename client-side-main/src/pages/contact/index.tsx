import Container from 'app/shared/components/Container'
import { Formiz, useForm } from '@formiz/core'
import Input from 'app/shared/components/Register/Input'
import * as validators from 'app/shared/components/Register/validators'
import toast from 'react-hot-toast'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useState } from 'react'
import { getClient } from 'app/store/api'

export default function Contact() {
  const form = useForm()
  //!TOOO: change to true
  const [captcha, setCaptcha] = useState(true)

  const handleSubmit = data => {
    if (!captcha) {
      toast.error('Please verify that you are not a robot')
      return
    }
    data.name = data.firstName + ' ' + data.lastName
    delete data.firstName
    delete data.lastName
    data.state = data.city
    delete data.city

    getClient().post('/contact', data)
    toast.success(
      "Merci d'avoir pris contact avec nous, nous reviendrons vers vous dès que possible",
      {
        duration: 3000, // display the toast for 3 seconds
      }
    )
    form.reset()
  }

  const handleVerificationSuccess = () => {
    setCaptcha(true)
  }

  const error = ''
  const loading = false

  return (
    <Container>
      <div className="pt-20">
        <div className="py-4 bg-white ">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !m-0 text-center">
            Contactez-nous
          </h1>
          <Formiz connect={form} onValidSubmit={handleSubmit}>
            <form
              noValidate
              onSubmit={form.submit}
              className="p-4 md:p-10 grid gap-4"
            >
              <div className="text-red-500">{error}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Nom"
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  validations={[
                    validators.required,
                    validators.pattern(/^[A-Za-z]+$/),
                  ]}
                />

                <Input
                  type="text"
                  name="lastName"
                  placeholder="Prénom"
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  validations={[
                    validators.required,
                    validators.pattern(/^[A-Za-z]+$/),
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone"
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  validations={[
                    validators.required,
                    validators.pattern(/^[0-9]{8}$/),
                  ]}
                />

                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  validations={[validators.required, validators.email]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  validations={[
                    validators.required,
                    validators.pattern(/^[^A-Za-z0-9]*[A-Za-z0-9][\w\W]*/),
                  ]}
                />

                <Input
                  type="text"
                  name="subject"
                  placeholder="Sujet"
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  validations={[
                    validators.required,
                    validators.pattern(/.*[a-zA-Z].*/
                    ),
                  ]}
                />
              </div>

              <div>
                <Input
                  type="textarea"
                  name="message"
                  placeholder="Votre Message"
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  validations={[
                    validators.required,
                    validators.pattern(/.*[a-zA-Z].*/
                    ),
                  ]}
                  rows={5}
                />
              </div>

              <div>
                <HCaptcha
                  sitekey="3e7bbcaa-ca97-4ca9-b710-3424b363e0a3"
                  onVerify={handleVerificationSuccess}
                />
              </div>
              <div className="flex justify-end items-center space-x-4 ">
                <button
                  className="button"
                  type="submit"
                  disabled={(!form.isValid && form.isSubmitted) || loading}
                >
                  Envoyez
                </button>
              </div>
            </form>
          </Formiz>
        </div>
      </div>
    </Container>
  )
}
