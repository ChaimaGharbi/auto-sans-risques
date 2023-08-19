import AutoComplete from 'app/shared/components/GoogleMaps/AutoComplete'
import { useGetExperts } from 'app/store/hooks'
import { useModels } from 'app/store/hooks'
import { Input } from 'antd'
import CheckboxTree from 'app/shared/components/CheckboxTree'
import ModelsAndMarks, {
  MarksPicker,
} from 'app/shared/components/ModelsAndMarks'
import { useMemo } from 'react'
import Picker from 'app/shared/components/Datepicker'

type Props = {
  inline?: boolean
  wrapperClassName: string
}
const Filter = (props: Props) => {
  const {
    filter,
    mark,
    model,
    handleAddress,
    handleAddressChange,
    handleFullName,
    handleSpecialiteChange,
    handleFilter,
    handleStartDateChange,
    handleEndDateChange,
  } = useGetExperts()
  console.log(filter)
  // TODO: Show Tags about the selected ones
  return (
    <div className={`bg-white shadow-lg flex flex-col w-full p-4 h-full`}>
      <div className="font-medium text-xl ">Filtrer Resultats</div>
      <div className={`pt-3 w-full grid ${props.wrapperClassName} gap-4`}>
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xs mb-2 uppercase">Localisation</div>
          <AutoComplete onChange={handleAddress}>
            <Input
              value={filter.address || ''}
              onChange={e => handleAddressChange(e.target.value)}
              defaultValue={filter.address || ''}
              name="location"
              placeholder="La ville où se trouve la voiture"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
              }}
              className="!border-[#C4CDD5] w-full !p-3 !text-black  !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900s"
            />
          </AutoComplete>
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-xs mb-2 uppercase">Nom</div>
          <Input
            value={filter.fullName || ''}
            onChange={e => handleFullName(e.target.value)}
            defaultValue={filter.fullName || ''}
            name="nom"
            aria-placeholder="Enter full name"
            placeholder="Enter full name"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
            }}
            className="border !border-[#C4CDD5] w-full !p-3 !text-black  !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900"
          />
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-xs mb-2 uppercase">
            Interval horaire
          </div>
          <div className="flex flex-col space-y-2">
            <Picker
              value={filter.dateRange[0] || ''}
              onChange={e => handleStartDateChange(e)}
              placeholder="À partir de"
              className="!font-rubik dt-picker w-full !h-12 huge:!h-20 !text-lg !text-black !bg-white !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900 cursor-pointer"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
                border: '1px solid #C4CDD5',
              }}
            />

            <Picker
              value={filter.dateRange[1] || ''}
              onChange={e => handleEndDateChange(e)}
              placeholder="Jusqu'à"
              className="!font-rubik dt-picker w-full !h-12 huge:!h-20 !text-lg !text-black !bg-white !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900 cursor-pointer"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
                border: '1px solid #C4CDD5',
              }}
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="font-bold text-xs mb-2 uppercase">Marque Voiture</div>
          <MarksPicker
            className="flex flex-col space-y-2"
            onChange={handleSpecialiteChange}
            defaultModel={model}
            defaultMark={mark}
          />
          {/* <ModelsAndMarks onChange={handleSpecialiteChange} /> */}
        </div>

        <button onClick={handleFilter} className="button  mt-auto w-full">
          Valider ma recherche
        </button>
      </div>
    </div>
  )
}

export default Filter

//
//
//
//           </div>

//           <div className="pt-3">
//             <div className="font-semibold text-sm">Marque Voiture</div>
//             {marksList && (
//               <DropdownHOC
//                 data={marksList}
//                 getSelectedList={getSelectedList}
//                 // register={register}
//               />
//             )}
//             {/*  <select
//               name="marque"
//               id="marque"
//               {marks?.entities.map((marque, i) => {
//                 return (
//                   <>
//                     {i == 0 && (
//                       <option selected value="">
//                         Choisir la marque
//                       </option>
//                     )}
//                     <option key={i} value={marque.label}>
//                       {marque.label}
//                     </option>
//                   </>
//                 );
//               })}
//             </select> */

//               className="border-gray-200 border-2 rounded-md p-1 m-1 w-full"
//               defaultValue={filter.filter.specialite}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setFilter1("specialite");
//               }}
//             >
