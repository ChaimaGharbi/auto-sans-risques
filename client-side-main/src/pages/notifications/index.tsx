import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useAllNotifications } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import If from 'app/shared/components/If'
import { Link } from 'react-router-dom'
import { PaginatedContent } from 'app/shared/components/paginated'
import { useState } from 'react'
import { useUpdateIsRead } from 'app/store/hooks'

function link(msg, id) {
  if (msg.toLowerCase().includes('veuillez confirmer ou annuler le rdv'))
    return '/missions'
  return `/ongoing/${id}`
}

const Notifications = () => {
  const { data, loading } = useAllNotifications()
  const [page, setPage] = useState(1)
  const pageSize = 6
  console.log(data)

  const updateIsRead = useUpdateIsRead()

  const handleIsRead = notificationId => {
    updateIsRead(notificationId)
    console.log('done')
    console.log(data)
  }

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
                  page={page}
                  pageSize={pageSize}
                  data={data}
                  onChange={pageNumber => setPage(pageNumber)}
                  onLoadMore={() => {}}
                  total={data?.length ? data.length : 0}
                  item={({ data }) => {
                    const { _id, message, reservationId, is_read } = data
                    const notificationStyle = {
                      color: is_read ? 'gray' : 'black',
                    }
                    return (
                      <div key={_id} className="py-4 flex justify-between">
                        <div className="text-sm text-gray-800">
                          
                          <Link
                            to={link(message, reservationId)}
                            className="text-primary"
                            onClick={() => handleIsRead(_id)}
                          >
                           <span style={notificationStyle}>{message}</span>
                          </Link>
                        </div>
                        <div className='flex items-center'>
                          {!is_read && (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 mr-5" />
                          )}
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
