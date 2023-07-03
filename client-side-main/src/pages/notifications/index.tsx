import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useAllNotifications } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import If from 'app/shared/components/If'
import { Link } from 'react-router-dom'
import { PaginatedContent } from 'app/shared/components/paginated'

function link(msg, id) {
  if (msg.toLowerCase().includes('veuillez confirmer ou annuler le rdv'))
    return '/missions'
  return `/ongoing/${id}`
}

const Notifications = () => {
  const { data, loading } = useAllNotifications()

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
                label: 'Notifications',
                path: '/notifications',
              },
            ]}
          />
        </div>

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Notifications
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y py-10 ">
              <If test={loading}>
                <Loading />
              </If>

              <If test={!loading && data}>
                <PaginatedContent
                  page={1}
                  pageSize={10}
                  data={data}
                  onChange={() => {}}
                  onLoadMore={() => {}}
                  total={data?.length ? data.length : 0}
                  item={({ data }) => {
                    const { _id, message, reservationId } = data
                    return (
                      <div key={_id} className="py-4">
                        <div className="text-sm text-gray-800">
                          {message}{' '}
                          <Link
                            to={link(message, reservationId)}
                            className="text-primary"
                          >
                            Visiter la page
                          </Link>
                        </div>
                      </div>
                    )
                  }}
                />
              </If>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default Notifications
