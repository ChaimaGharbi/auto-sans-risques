import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import Card from './components/Card'
import { useGetMyReclamations } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import { PaginatedContent } from 'app/shared/components/paginated'
import { useState } from 'react'

export default function Reservations() {
  const { data, loading } = useGetMyReclamations()
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
              <PaginatedContent
                page={page}
                pageSize={pageSize}
                data={data}
                onChange={pageNumber => setPage(pageNumber)}
                onLoadMore={() => {}}
                total={data?.length ? data.length : 0}
                item={({ data }) => {
                  const { _id, date, title, etat } = data

                  return (
                    <Card
                      status={etat}
                      id={_id}
                      key={_id}
                      date={date}
                      title={title}
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
