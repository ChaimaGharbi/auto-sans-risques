import { DatePicker, Input } from 'antd'
import { useSearchForm } from '../hooks'
import { Link } from 'react-router-dom'
import AutoComplete from 'app/shared/components/GoogleMaps/AutoComplete'
import ModelsAndMarks, {
  MarksPicker,
} from 'app/shared/components/ModelsAndMarks'
import Picker from 'app/shared/components/Datepicker'
import {useEffect} from 'react'


import { Location } from './Icons'

const HeroSection = () => {
  const {
    address,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    handleChangeInput,
    query,
    handleChangeModels,
  } = useSearchForm()

  useEffect(() => {
  
    console.log(query);
    
  }, [query])
  

  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url(/img/hero-section.png)' }}
    >
      <div className="bg-black/30 grid content-center justify-items-center  h-full ">
        <div className="py-2 text-2xl lg:text-4xl xl:text-5xl huge:text-7xl text-white text-center font-bold w-full">
          Vous cherchez un expert pour votre voiture ?
        </div>

        <div className="text-lg lg:text-xl xl:text-2xl huge:text-5xl  pt-3 lg:pt-6 text-white   mx-10 lg:mx-32 lg:mt-4 font-semibold">
          Achetez en toute sécurité le véhicule d'un particulier, contrôlé par
          l'un de nos experts
        </div>

        <div className="pt-5 w-full max-w-xl md:max-w-3xl  xl:max-w-5xl huge:max-w-[140rem] ">
          AutoComplete={}<div className="grid  grid-cols-1 md:grid-cols-2 gap-4 px-4 content-start">
            <AutoComplete
              onChange={handleChangeInput}
              className="col-span-1 md:col-span-2"
            >
              <Input
                value={address}
                onChange={e => handleChangeInput(e.target.value)}
                name="location"
                suffix={<Location />}
                placeholder="La ville où se trouve la voiture"
                className="!font-mulish w-full !h-12 huge:!h-20 !text-lg !text-black !bg-white !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900 cursor-pointer"
              />
            </AutoComplete>
            <Picker
              value={startDate}
              onChange={e => handleStartDateChange(e)}
              placeholder="À partir de"
              className="!font-mulish dt-picker w-full !h-12 huge:!h-20 !text-lg !text-black !bg-white !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900 cursor-pointer"
            />
            <Picker
              value={endDate}
              onChange={e => handleEndDateChange(e)}
              placeholder="Jusqu'au"
              className="!font-mulish dt-picker w-full !h-12 huge:!h-20 !text-lg !text-black !bg-white !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900 cursor-pointer"
            />

            <MarksPicker
              onChange={handleChangeModels}
              className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
            />

            {/* <ModelsAndMarks onChange={handleSpecialiteChange} /> */}

            <Link
              to={`/experts?${query}`}
              className="col-span-1 md:col-span-2 button grid place-content-center  huge:!h-20   text-lg huge:text-2xl "
            >
              Lancer la recherche
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
// function Landing1() {
//   const [query, setQuery] = useState("");
//   const [dateStart, setDateStart] = useState(moment().toDate());
//   const [dateEnd, setDateEnd] = useState(moment().add(15, "days").toDate());
//   const [dateFilter, setDateFilter] = useState({});
//   const [position, setPosition] = useState();
//   const history = useHistory();

//   const handleChange = (address) => {
//     setQuery(address);
//   };

//   useEffect(()=>{
//     setDateFilter({
//       dateStart: dateStart,
//       startDay: moment().isoWeekday(),
//       startHour: moment().format("HH:mm"),
//       dateEnd: dateEnd,
//       endDay: moment().add(15, "days").isoWeekday(),
//       endHour: moment().format("HH:mm"),
//     });
//   },[]);

//   const handleSelect = (address) => {
//     setQuery(address);
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => {
//         setPosition(latLng);
//       })
//       .catch((error) => console.error("Error", error));
//   };

// <div
//   style={{ marginTop: "0px" }}
//   className="z-10 relative text-gray-400 focus-within:text-gray-800 pr-5  mt-3 lg:mt-0 leaflet-control-geosearch leaflet-geosearch-bar"
// >
//   <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//     <RoomIcon />
//   </span>
//   <PlacesAutocomplete
//     value={query}
//     searchOptions={{ componentRestrictions: { country: "tn" } }}
//     onChange={handleChange}
//     onSelect={handleSelect}
//   >
//     {({
//       getInputProps,
//       suggestions,
//       getSuggestionItemProps,
//       loading,
//     }) => (
//       <div className="">
//         <input
//           {...getInputProps({
//             placeholder: "Entrer Cité,Region ...",
//             className:
//               "py-2 w-full text-lg text-black bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900",
//           })}
//         />
//         <div className="autocomplete-dropdown-container absolute">
//           {loading && <div>Loading...</div>}
//           {suggestions.map((suggestion, i) => {
//             const key = i;
//             const className = suggestion.active
//               ? "suggestion-item--active"
//               : "suggestion-item";
//             // inline style for demonstration purpose
//             const style = suggestion.active
//               ? { backgroundColor: "#fafafa", cursor: "pointer" }
//               : { backgroundColor: "#ffffff", cursor: "pointer" };
//             return (
//               <div
//                 key={i}
//                 {...getSuggestionItemProps(suggestion, {
//                   className,
//                   style,
//                   key,
//                 })}
//               >
//                 <span>{suggestion.description}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     )}
//   </PlacesAutocomplete>
// </div>

// <div
//   className="flex flex-col md:flex-row justify-center items-center lg:pt-5 xl:pt-0"
// >
//   <div className="relative text-gray-400 focus-within:text-gray-800 pr-5 mt-3 lg:mt-0">
//     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//       <TodayIcon />
//     </span>
//     <Flatpickr
//       data-enable-time
//       options={{
//         minDate: "today",
//         maxDate: moment().add(60, "days").toDate(),
//       }}
//       onChange={(date) => {
//         setDateStart(moment(date[0]).toDate());
//         //
//         const startH = moment(date[0]).format("HH:mm");
//         setDateFilter({
//           dateStart: moment(date[0]).toDate(),
//           startDay: moment(date[0]).isoWeekday(),
//           startHour: startH,
//           dateEnd: dateEnd,
//           endDay: dateFilter.endDay,
//           endHour: dateFilter.endHour,
//         });
//       }}
//       value={dateStart}
//       className="py-2 text-lg text-black bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
//     />
//   </div>
//   <div className="relative text-gray-400 focus-within:text-gray-800 pr-5 mt-3 lg:mt-0">
//     <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
//       <TodayIcon />
//     </span>
//     <Flatpickr
//       data-enable-time
//       options={{
//         minDate: "today",
//         maxDate: moment().add(30, "days").toDate(),
//       }}
//       onChange={(date) => {
//         setDateEnd(moment(date[0]).toDate());
//         const endH = moment(date[0]).format("HH:mm");
//         setDateFilter({
//           dateStart: dateFilter.dateStart,
//           startDay: dateFilter.startDay,
//           startHour: dateFilter.startHour,
//           dateEnd:  moment(date[0]).toDate(),
//           endDay: moment(date[0]).isoWeekday(),
//           endHour: endH,
//         });
//       }}
//       value={dateEnd}
//       className="py-2 text-lg text-black bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
//     />
//   </div>

//   <div
//     onClick={() => {
//       history.push("/expert", { latLng: position, dateFilter });
//     }}
//     className="relative text-gray-400 focus-within:text-gray-800 pr-5 mt-3 lg:mt-0"
//   >
//     <button className="text-white text-sm block hover:text-gray-300 bg-blue-400 rounded-md font-medium py-3 px-3 w-40">
//       Demander assistance
//     </button>
//   </div>
// </div>

//     </>
//   );
// }

// export default Landing1;
