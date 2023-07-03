import { useView, ViewProvider, useMap } from './hooks'
import { Link } from 'react-router-dom'
import Container from 'app/shared/components/Container'
import List from './components/List'
import Filter from './components/Filter'
import Header from './components/Header'
import Map from 'app/shared/components/GoogleMaps/Map'
import { useGetExperts } from 'app/store/hooks'
import If from 'app/shared/components/If'
import Breadcrumb from 'app/shared/components/Breadcrumb'

// TODO: helmet
const ExpertsPage = () => {
  const { isListView, isMapView } = useView()

  const { center } = useMap()

  const { sort, state } = useGetExperts()

  return (
    <div className="w-full pt-20 bg-[#F6F9FC]">
      <Container>
        <Breadcrumb
          path={[
            {
              label: 'Accueil',
              path: '',
            },
            {
              label: 'Cherchez Expert',
              path: 'experts',
            },
          ]}
        />

        <If test={isListView}>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
            <div className="col-span-3">
              <Header value={state.total} onSort={sort} />
            </div>

            <div className="col-span-3 row-start-1 col-start-1 row-span-2 lg:col-span-1">
              <Filter wrapperClassName="" />
            </div>

            <div className="col-span-3">
              <List />
            </div>
          </div>
        </If>

        <If test={isMapView}>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="col-span-3 lg:col-span-2 ">
              <Filter wrapperClassName="grid-cols-1 lg:grid-cols-4 content-start" />
            </div>

            <div className="col-span-2">
              <Header value={state.total} onSort={sort} />
            </div>

            <div className="col-span-3 lg:hidden h-[400px] lg:h-auto">
              <Map center={center} data={state.data} />
            </div>

            <div className="col-span-3 lg:hidden">
              <List />
            </div>

            <div className="hidden lg:block col-span-3 lg:col-span-1">
              <List />
            </div>

            <div className="hidden lg:block lg:col-span-1 h-[400px] lg:h-auto">
              <Map center={center} data={state.data} />
            </div>
          </div>
        </If>
      </Container>
    </div>
  )
}

export default () => (
  <ViewProvider>
    <ExpertsPage />
  </ViewProvider>
)
