import {
  isRequired,
  isEmail,
  isNumber,
  isMinNumber,
  isMaxNumber,
  isLength,
  isMinLength,
  isMaxLength,
  isPattern,
} from '@formiz/validations'

export const required = {
  rule: isRequired(),
  message: 'Ce champ est obligatoire',
}

export const notJustSpaces = {
  // text is not just spaces
  rule: isPattern(/^[^A-Za-z0-9]*[A-Za-z0-9][\w\W]*/),
  message: 'Ce champ ne doit pas contenir que des espaces',
}

export const phone = {
  rule: isPattern(/^\+?[0-9\s\-\(\)]+$/),
  message: 'Ce champ doit être un numéro de téléphone valide',
}

export const email = {
  rule: isEmail(),
  message: "Ceci n'est pas un e-mail valide",
}

export const sameAs = other => ({
  rule: value => value === other,
  message: 'Les mots de passe ne correspondent pas',
})

export const number = {
  rule: isNumber(),
  message: "Ce n'est pas un numéro valide",
}

export const min = (limit: number) => ({
  rule: isMinNumber(limit),
  message: `Cela devrait être un nombre supérieur ${limit}`,
})

export const max = (limit: number) => ({
  rule: isMaxNumber(limit),
  message: `Cela devrait être un nombre sous  ${limit}`,
})

export const length = (limit: number) => ({
  rule: isLength(limit),
  message: `Celui-ci ne doit contenir que ${limit} caractères`,
})

export const minLength = (limit: number) => ({
  rule: isMinLength(limit),
  message: `Celui-ci doit contenir au moins ${limit} caractères`,
})

export const maxLength = (limit: number) => ({
  rule: isMaxLength(limit),
  message: `Celui-ci doit contenir au maximum ${limit} caractères`,
})

export const pattern = (regex: RegExp) => ({
  rule: isPattern(regex),
  message: "Ce n'est pas valide",
})

export const match = (...options: string[]) => ({
  rule: isPattern(new RegExp(`^(${options.join('|')})$`)),
  message: "Cette valeur doit être l'une des suivantes: " + options.join(', '),
})
