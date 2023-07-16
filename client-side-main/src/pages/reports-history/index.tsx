import Container from 'app/shared/components/Container'
import Card from './components/Card'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useGetCompletedMissions } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import If from 'app/shared/components/If'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from 'app/socket'
import { PaginatedContent } from 'app/shared/components/paginated'

const ReportsHistory = () => {
  const { data, loading } = useGetCompletedMissions()
  const [page, setPage] = useState(1)
  const pageSize = 3

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
              <PaginatedContent
                  page={page}
                  pageSize={pageSize}
                  data={data}
                  onChange={pageNumber => setPage(pageNumber)}
                  onLoadMore={() => {}}
                  total={data?.length ? data.length : 0}
                  item={({ data }) => {
                    const { _id, reason, typeCar, createdAt, client, rapportId, link } =
                      data

                    return (
                  <Card
                    key={rapportId}
                    comment={reason + ' - ' + typeCar}
                    date={createdAt}
                    client={client[0]}
                    report={rapportId}
                    link={link}
                  />
                  )
                }}
              ></PaginatedContent>
              </If>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}
export default ReportsHistory
