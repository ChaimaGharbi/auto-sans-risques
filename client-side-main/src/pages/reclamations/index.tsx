import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import Card from './components/Card'
import { useGetMyReclamations } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'

export default function Reservations() {
  const { data, loading } = useGetMyReclamations()

  if (loading) return <Loading />

  return (
    <Container>
      <div className="py-20">
        <div className="py-4">
          <Breadcrumb
            path={[
              {
                label: 'Accueil',
                path: '',
              },
              {
                label: 'Mes Tickets de reclamation',
                path: '/reclamations',
              },
            ]}
          />
        </div>

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Mes Tickets de reclamation
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y">
              {data?.map(rec => (
                <Card
                  status={rec.etat}
                  id={rec._id}
                  key={rec._id}
                  date={rec.date}
                  title={rec.title}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}
