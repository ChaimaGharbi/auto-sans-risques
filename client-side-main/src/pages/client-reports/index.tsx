import Container from 'app/shared/components/Container'
import Card from './components/Card'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useGetReportsForClient } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import { PaginatedContent } from 'app/shared/components/paginated'
import { useState } from 'react'

const Reports = () => {
  const { data, loading } = useGetReportsForClient()
  const [page, setPage] = useState(1)
  const pageSize = 3

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
                label: 'Mon Historique de rapports',
                path: '/reports',
              },
            ]}
          />
        </div>

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Mon Historique de rapports
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y">
              <PaginatedContent
                page={page}
                pageSize={pageSize}
                data={data}
                onChange={pageNumber => setPage(pageNumber)}
                onLoadMore={() => {}}
                total={data?.length ? data.length : 0}
                item={({ data }) => {
                  const { _id, reason, typeCar, date, expert, link, status } =
                    data

                  return (
                    <Card
                      key={_id}
                      id={_id}
                      status={status}
                      comment={reason + ' - ' + typeCar}
                      date={date}
                      expert={expert[0]}
                      link={link}
                    />
                  )
                }}
              ></PaginatedContent>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default Reports
