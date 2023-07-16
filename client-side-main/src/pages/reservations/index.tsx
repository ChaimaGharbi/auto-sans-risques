import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import Card from './components/Card'
import { useGetMyReservations } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import { PaginatedContent } from 'app/shared/components/paginated'
import { useState } from 'react'
import { log } from 'console'

export default function Reclamation() {
  const { data, loading } = useGetMyReservations()
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

          <PaginatedContent
            page={page}
            pageSize={pageSize}
            data={data}
            onChange={pageNumber => setPage(pageNumber)}
            onLoadMore={() => {}}
            total={data?.length ? data.length : 0}
            item={({ data }) => {
              const { _id, status, reason, typeCar, createdAt, expert } = data

              console.log(data)

              return (
                <Card
                  status={status}
                  id={_id}
                  key={_id}
                  comment={reason + ' - ' + typeCar}
                  date={createdAt}
                  expert={expert[0]}
                />
              )
            }}
          ></PaginatedContent>
        </div>
      </div>
    </Container>
  )
}
