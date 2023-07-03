import * as yup from 'yup'

const schema = yup.object().shape({
  fullName: yup.string().required().min(3).max(50),
  phone: yup.string().required().min(8).max(8),
  reason: yup.string().required().min(2).max(50), // TODO: SERIOUSLY?
  date: yup.date().required(),
  typeCar: yup.string().required(),
})

export const validate = async (data: any) => {
  try {
    const is = await schema.validate(data, { abortEarly: false })
    return { is, errors: [] }
  } catch (err: any) {
    return {
      is: false,
      errors: err.errors,
    }
  }
}
