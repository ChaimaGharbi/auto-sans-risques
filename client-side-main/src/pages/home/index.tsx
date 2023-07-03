import { useEffect, useState } from 'react'
import If from '../../shared/components/If'
// import { useParams } from "react-router";
// import EmailVerifModal from "../Auth/EmailVerifModal";
// import { fetchAdsByUserId } from "../Ads/_redux/AdsActions";
// import ResetModal from "../Auth/ResetModal";
import HeroSection from './components/HeroSection'
import TopExperts from './components/TopExperts'
import AskForAssistance from './components/AskForAssistance'
import OurLocation from './components/OurLocation'
import Blog from './components/Blog'
import { useSearchParams } from 'react-router-dom'


const useScrollTo = () => {
  const [q] = useSearchParams()
  const to = q.get('to')
  //import user

  useEffect(() => {
    if (to) {
      const el = document.getElementById(to)
      console.log(el);
      
      if (el) {
        el.scrollIntoView({behavior:'smooth', block:'end'})
          console.log("scrolled into view")
        
      }
    }
  }, [to])
}

const HomePage = () => {
  useScrollTo()

  // TODO: This part, idk
  // const { user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  // let { token, role, tokenEmail } = useParams();
  //
  // useEffect(() => {
  //   if (user) {
  //     dispatch(
  //       fetchAdsByUserId({
  //         filter: {
  //           userId: user._id,
  //           typeUser: user?.roles,
  //         },
  //         sortOrder: "desc",
  //         sortField: "DEFAULT",
  //         pageNumber: 1,
  //         pageSize: 2,
  //       })
  //     );
  //   }
  // }, [user]);

  const token = 'idk'
  const tokenEmail = 'idk-too'

  return (
    <div>
      <If test={token}>
        {''}
        {/* <ResetModal
      token={token}
      role={role}
      showModal={showModal}
      showModalFn={() => setShowModal(true)}
      closeModal={() => setShowModal(false)}
    /> */}
      </If>

      <If test={tokenEmail}>
        {''}
        {/* <ResetModal
        token={token}
        role={role}
        showModal={showModal}
        showModalFn={() => setShowModal(true)}
        closeModal={() => setShowModal(false)}
        /> */}
      </If>

      <HeroSection />
      <TopExperts />
      <AskForAssistance />
      <Blog />
      <OurLocation />
    </div>
  )
}

export default HomePage
