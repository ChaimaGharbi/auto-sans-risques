import Details from './components/Details'
import Reviews from './components/Reviews'
import Reserve from './components/Reserve'
import {
  useGetReviews,
  useLoadExpert,
  useGetUser,
  useGetExpert,
} from 'app/store/hooks'
import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useState } from 'react'

const ExpertPage = () => {
  const { total, avg } = useGetReviews()
  const { role, isLogged } = useGetUser()
  useLoadExpert()
  const expert = useGetExpert()

  return (
    <Container>
      <div className="w-full py-20 bg-[#F6F9FC] ">
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
            {
              label: expert?.data?.fullName,
              path: expert?.data?._id,
            },
          ]}
        />
        <div
          className={`grid grid-cols-1 mt-6 ${
            role == 'CLIENT' && 'lg:grid-cols-3 lg:gap-x-10 '
          }`}
        >
          <Details
            reviews={{
              total,
              avg,
            }}
          />
          {role == 'CLIENT' && <Reserve />}
          <Reviews />
        </div>
      </div>
    </Container>
  )
}

export default ExpertPage

/*   return (
    <Container>
      <div className="w-full py-20 bg-[#F6F9FC] ">
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
            {
              label: expert.data?.fullName,
              path: expert.data?._id,
            },
          ]}
        />submitStep
        <div className="grid grid-cols-1   mt-6">
          <Details
            reviews={{
              total,
              avg,
            }}
          />
          <Reviews />
        </div>
      </div>
    </Container>
  ) */

//   return (
//     <div className="w-full pt-20 bg-[#F6F9FC]">
//       <div
//         className={
//           role() == 'CLIENT'
//             ? 'flex flex-col md:flex-row lg:flex-row '
//             : 'flex flex-col md:flex-row lg:flex-row justify-center'
//         }
//       >
//         {/*
// <ExpertDetails
//     note={note}
//     actionsLoading={actionsLoading}
//     actionsLoading1={actionsLoading1}
//     expertFetched={expertFetched}
//     //lessdetails={!user?.roles == "CLIENT"}
//   />
//    */}

//         {role() == 'CLIENT' ? (
//           <div className="xl:w-1/4 lg:w-2/6 md:w-2/5 lg:ml-4 md:ml-4 bg-white mt-6 lg:p-2 md:p-2 rounded-sm">
//             {/* <ReserverCard expertId={expertId} expertFetched={expertFetched} /> */}
//           </div>
//         ) : (
//           ''
//         )}
//       </div>

//       <div
//         className={
//           role() == 'CLIENT'
//             ? 'bg-white mt-6 p-2 mb-6 rounded-sm xl:w-3/4 lg:w-3/5 md:w-3/5'
//             : 'bg-white mt-6 p-2 mb-6 rounded-sm w-full'
//         }
//       >
//         {/* <Reviews
//     expertId={expertId}
//     listLoading={listLoadingCompleted}
//     numAvis={numAvis}
//     reviews={reviews}
//   /> */}
//       </div>
//     </div>
//   )

// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../_redux/ExpertActions";

//   const { expertId } = useParams();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(actions.fetchExpert(expertId));
//     dispatch(actions.fetchReviews(expertId, 5));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, expertId]);

// const {
//   listLoadingCompleted,
//   actionsLoading,
//   actionsLoading1,
//   expertFetched,
//   reviews,
//   numAvis,
//   note,
// } = useSelector(
//   (state) => ({
//     listLoadingCompleted: state.experts.listLoadingCompleted,
//     actionsLoading: state.experts.actionsLoading,
//     actionsLoading1: state.experts.actionsLoading1,
//     expertFetched: state.experts.expertFetched,
//     reviews: state.experts.reviews,
//     numAvis: state.experts.numAvis,
//     note: state.experts.note,
//   }),
//   shallowEqual
// );
