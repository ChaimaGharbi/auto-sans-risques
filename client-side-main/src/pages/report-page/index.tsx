import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import Report from './components/Report'
import { useGetMission } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import If from 'app/shared/components/If'

const OngoingMissions = () => {
  const { loading, data } = useGetMission()
  console.log(data);
  
  if (loading || !data) return <Loading />

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
                label: 'Missions',
                path: '/ongoing',
              },
              {
                label: 'Rapport',
                path: 'report',
              },
            ]}
          />
        </div>

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Rapport visite
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y">
              <If test={data.length === 0}>Aucune mission en cours</If>

              <If test={data.length !== 0}>
                <Report
                  comment={data[0]?.reason + ' - ' + data[0]?.typeCar}
                  date={data[0]?.date}
                  client={data[0]?.client[0]}
                />
              </If>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default OngoingMissions
