import Container from 'app/shared/components/Container'
import Card from './components/Card'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useGetMissionsRequests } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import If from 'app/shared/components/If'

const Missions = () => {
  const { data, loading } = useGetMissionsRequests()

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
                label: 'Mes Demandes de Missions',
                path: '/missions',
              },
            ]}
          />
        </div>

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Mes Demandes de Missions
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y">
              <If test={loading}>
                <Loading />
              </If>
              <If test={!loading && data}>
                {data?.map(mission => (
                  <Card
                    id={mission._id}
                    key={mission._id}
                    comment={mission.reason + ' - ' + mission.typeCar}
                    date={mission.date}
                    client={mission.client[0]}
                  />
                ))}
              </If>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default Missions
