import Container from 'app/shared/components/Container'
import Details from './components/Details'
import Reviews from './components/Reviews'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useGetUser, useGetMyReviews, useGetReviews } from 'app/store/hooks'
import If from 'app/shared/components/If'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const { me, role } = useGetUser()
  const { avg, total } = useGetReviews()
  useGetMyReviews()

  return (
    <>
      <If test={role === 'EXPERT'}>
        <Container>
          <div className="w-full py-20 bg-[#F6F9FC] ">
            <Breadcrumb
              path={[
                {
                  label: 'Accueil',
                  path: '',
                },
                {
                  label: me.data?.fullName || '',
                  path: '',
                },
              ]}
            />

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
      </If>
      <If test={role === 'CLIENT'}>
        <Navigate to="/edit" />
        HI CLIENT
      </If>
    </>
  )
}

export default Profile
