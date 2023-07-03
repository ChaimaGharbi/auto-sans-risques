import Container from 'app/shared/components/Container'
import Card from './components/Card'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useGetReportsForClient } from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'

const Reports = () => {
  const { data, loading } = useGetReportsForClient()
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
              {data?.map(report => (
                <Card
                  key={report._id}
                  id={report._id}
                  status={report.status}
                  comment={report.reason + ' - ' + report.typeCar}
                  date={report.date}
                  expert={report.expert[0]}
                  link={report.link}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default Reports
