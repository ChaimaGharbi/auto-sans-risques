import { useView } from '../hooks'
import { FaMap as MapIcon, FaList as ListIcon } from 'react-icons/fa'
import { Spinner } from 'app/shared/components/Loading'
import If from 'app/shared/components/If'
import Select from 'app/shared/components/Select'

const Header = props => {
  const { isListView, isMapView, switchToListView, switchToMapView } = useView()

  return (
    <div className="font-bold text-xl grid sm:flex items-center space-y-2 sm:space-y-0">
      <div className="flex items-center space-x-2">
        <If test={props.loading}>
          <Spinner />
        </If>
        <If test={!props.loading}>
          <span className="text-primary text-4xl">{props.value}</span>
        </If>
        <div className="text-3xl">Experts</div>
      </div>
      <div className="ml-auto"></div>

      <div className="space-x-0 space-y-2 sm:space-x-2 sm:space-y-0 font-bold text-xl grid sm:flex items-center">
        <Select
          onChange={props.onSort}
          choices={[
            { value: 'note', label: 'Note' },
            { label: 'A-Z', value: 'fullName' },
          ]}
          placeholder="Trier par"
        />

        <button
          onClick={switchToListView}
          className={`p-2 border flex items-center space-x-2 rounded cursor-pointer
              ${
                isListView
                  ? 'text-primary border-primary'
                  : 'text-[#9FAAB8] border-[#E0E2E4]'
              }
        `}
        >
          <span className="text-xs font-bold">VOIR EN LISTE</span>
          <ListIcon className="h-4 w-4" />
        </button>
        <button
          onClick={switchToMapView}
          className={`p-2 border flex items-center space-x-2 rounded cursor-pointer
              ${
                isMapView
                  ? 'text-primary border-primary'
                  : 'text-[#9FAAB8] border-[#E0E2E4]'
              }
        `}
        >
          <span className="text-xs font-bold">VOIR EN MAP</span>
          <MapIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Header
