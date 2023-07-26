import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useGetUser, useGetMyReviews, useGetReviews } from 'app/store/hooks'
import If from 'app/shared/components/If'
import Header from './components/Header'
import Form from './components/Form'

const Profile = () => {
  const { me, role } = useGetUser()
  const { avg, total } = useGetReviews()
  useGetMyReviews()

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
              label: me.data?.fullName || '',
              path: '',
            },
            {
              label: 'Paramètre',
              path: 'edit',
            },
          ]}
        />

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Mon Compte
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y justify-center">
              <Header />
              <Form />
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default Profile
