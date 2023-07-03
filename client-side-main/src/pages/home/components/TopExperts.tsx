import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'
import If from 'app/shared/components/If'
import { useAuthenticationModal, useGetTopExperts, useGetUser } from 'app/store/hooks'
import Container from 'app/shared/components/Container'
import LoginModal from 'app/shared/components/Modal/Authentication'
// @ts-ignore
const RMC = Carousel.default ? Carousel.default : Carousel

const TopExperts = () => {
  const { open: modalOpen, toggleModal, closeModal } = useAuthenticationModal()
  const state = useGetTopExperts()
  const { role, isLogged } = useGetUser()
  console.log(state.data);


  const handleClick = () => {
    if (!isLogged) {
      toggleModal()
      return (
        <>
          <LoginModal open={modalOpen} onClose={closeModal} />
        </>
      )
    }
  }

  return (
    <Container>
      <div className="mt-10 pb-10">
        <div className="relative">
          <img
            className="top-10 left-14 mb-5 w-28 lg:w-40"
            src="/img/quote.png"
            alt="quote"
          />
          <div className="font-bold absolute text:xl lg:text-2xl left-16 top-12">
            Nos Meileurs Experts
          </div>
          <If test={!state.loading && state.data}>
            <RMC
              ssr
              partialVisible={true}
              itemClass="image-item"
              className="px-6"
              responsive={responsive}
            >
              {state.data.map((expert, i) => (
                <Link
                  to={isLogged ? `/experts/${expert._id}` : ''}
                  key={i}
                  className="py-4 cursor-pointer"
                  
                >
                  <div onClick={handleClick}>
                  <div className="mx-2 lg:mx-6 xl:mx-12 rounded-md overflow-hidden shadow-lg">
                    <img
                      className="w-full h-56 lg:h-64 xl:h-80 bg-gray-300 object-cover"
                      src={expert.img ? expert.img : '/img/default-profile.svg'}
                    />
                  </div>
                  <div className="font-semibold text-xl mb-2 text-center pt-2">
                    {expert.fullName}
                  </div>

                  <div className="font-medium text-gray-700 text-base mb-2 text-center pt-2">
                    Expert {expert.specialite.toString()}
                  </div>
                  </div>
                </Link>
              ))}
            </RMC>
          </If>
        </div>
      </div>
    </Container>
  )
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
}

export default TopExperts
