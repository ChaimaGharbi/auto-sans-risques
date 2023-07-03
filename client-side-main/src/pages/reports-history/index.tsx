import Container from 'app/shared/components/Container'
import Card from './components/Card'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useGetCompletedMissions } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import If from 'app/shared/components/If'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from 'app/socket'
const ReportsHistory = () => {
  const { data, loading } = useGetCompletedMissions()

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
                label: 'Mon Hitorique de rapports',
                path: '/reports',
              },
            ]}
          />
        </div>
        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Mon Hitorique de rapports
          </div>
          <Container>
            <div className="grid gap-y-4 divide-y">
              <If test={loading}>
                <Loading />
              </If>
              <If test={!loading && data}>
                {data?.map(mission => (
                  <Card
                    key={mission.rapportId}
                    comment={mission.reason + ' - ' + mission.typeCar}
                    date={mission.createdAt}
                    client={mission.client[0]}
                    report={mission.rapportId}
                    link={mission.link}
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
export default ReportsHistory
