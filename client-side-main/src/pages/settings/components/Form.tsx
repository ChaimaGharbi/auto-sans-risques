import { useGetUser } from 'app/store/hooks'
import ExpertsForm from './Expert'
import ClientsForm from './Client'

export default function Form() {
  const {
    me: { data },
  } = useGetUser()
  if (!data) return null

  if (data.role === 'EXPERT') return <ExpertsForm />

  return <ClientsForm />
}
