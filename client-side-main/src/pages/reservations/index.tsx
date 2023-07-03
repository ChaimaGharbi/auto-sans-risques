import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import Card from './components/Card'
import { useGetMyReservations } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'

export default function Reclamation() {
  const { data, loading } = useGetMyReservations()
  console.log(data)

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
                label: 'Mes réservations',
                path: '/reservations',
              },
            ]}
          />
        </div>

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Mes réservations
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y">
              {data?.map(mission => (
                <Card
                  status={mission.status}
                  id={mission._id}
                  key={mission._id}
                  comment={mission.reason + ' - ' + mission.typeCar}
                  date={mission.createdAt}
                  expert={mission.expert[0]}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}
