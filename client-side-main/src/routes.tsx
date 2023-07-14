import { Routes, Route, Navigate } from 'react-router-dom'
import * as routes from './pages'
import { useAuthenticationModal, useGetUser } from './store/hooks'

// const _routes = [
//   {
//     path: '/home',
//     componentPath: './pages/home',
//   },
//   {
//     path: '/experts',
//     componentPath: './pages/experts',
//   },
//   {
//     path: '/experts/:id',
//     componentPath: './pages/expert',
//   },
//   {
//     path: '',
//     componentPath: './pages/profile',
//   },
//   {
//     path: '/reservations',
//     componentPath: './pages/reservations',
//   },
//   {
//     path: '/missions',
//     componentPath: './pages/missions',
//   },
// ]

// // const HomePage = lazy(() => import('./pages/home'))
// // const ExpertReservationsPage = lazy(() => import('./pages/reservations'))
// // const ExpertMissionsPage = lazy(() => import('./pages/missions'))
// // const Profile = lazy(() => import('./pages/profile'))

// const loadRoutes = () => {
//   const ROUTES = import.meta.glob('/src/pages/**/index.tsx')

//   const routes = Object.keys(ROUTES).reduce(
//     (acc: { [key: string]: any }, cur: string) => {
//       let key = cur
//         .replace(/\/src\/pages|index|\.tsx$/g, '')
//         .replace(/\[\.{3}.+\]/, '*')
//         .replace(/\[(.+)\]/, ':$1')
//       key = key.substring(1, key.length - 1)
//       return { ...acc, [key]: ROUTES[cur] }
//     },
//     {}
//   )

//   return _routes.map(route => {
//     const Component = lazy(routes[route.componentPath])
//     return {
//       path: route.path,
//       Component,
//     }
//   })
// }

// const routes = loadRoutes()

//

const AppRoutes = () => {
  const { openModal } = useAuthenticationModal()

  const PageWrapper = ({ permissions, element }) => {
    //get user from store
    // const { role, isLogged } = useGetUser()
    const token = localStorage.getItem('cm9sZQ==')
    //decode the role from base64
    const decoded = atob(token || '')

    //alert(role)
    if (!decoded) {
      openModal()
      return <Navigate to="/home" />
    }
    // const hasPermission = permissions.includes(role)

    if (!permissions.includes(decoded) /*  || !hasPermission */) {
      return <Navigate to="/error" />
    }

    return element
  }

  return (
    <Routes>
      {/* Logged In Part */}
      <Route
        path="/experts"
        element={
          <PageWrapper
            permissions={['EXPERT', 'CLIENT']}
            element={<routes.ExpertsPage />}
          />
        }
      />

      <Route
        path="/profile"
        element={
          <PageWrapper
            permissions={['EXPERT', 'CLIENT']}
            element={<routes.ProfilePage />}
          />
        }
      />
      <Route
        path="/edit"
        element={
          <PageWrapper
            permissions={['EXPERT', 'CLIENT']}
            element={<routes.SettingsPage />}
          />
        }
      />
      <Route
        path="/reset/:token"
        element={
          <PageWrapper
            permissions={['EXPERT', 'CLIENT']}
            element={<routes.ResetPasswordPage />}
          />
        }
      />
      <Route
        path="/experts/:id"
        element={
          <PageWrapper
            permissions={['EXPERT', 'CLIENT']}
            element={<routes.ExpertPage />}
          />
        }
      />

      {/* Expert Part */}

      <Route
        path="/missions"
        element={
          <PageWrapper
            permissions={['EXPERT']}
            element={<routes.ExpertMissionsPage />}
          />
        }
      />
      <Route
        path="/ongoing"
        element={
          <PageWrapper
            permissions={['EXPERT']}
            element={<routes.OngoingMissionsPage />}
          />
        }
      />
      <Route
        path="/ongoing/:id"
        element={
          <PageWrapper
            permissions={['EXPERT']}
            element={<routes.ReportPage />}
          />
        }
      />
      <Route
        path="/reports"
        element={
          <PageWrapper
            permissions={['EXPERT']}
            element={<routes.ReportsHistoryPage />}
          />
        }
      />

      <Route
        path="/availability"
        element={
          <PageWrapper
            permissions={['EXPERT']}
            element={<routes.AvailabilityPage />}
          />
        }
      />
      <Route
        path="/buy-credits"
        element={
          <PageWrapper
            permissions={['EXPERT']}
            element={<routes.BuyCreditesPage />}
          />
        }
      />
      <Route
        path="/notifications"
        element={
          <PageWrapper
            permissions={['EXPERT', 'CLIENT']}
            element={<routes.NotificationsPage />}
          />
        }
      />

      {/* Client Part */}
      <Route
        path="/reclamations"
        element={
          <PageWrapper
            permissions={['CLIENT']}
            element={<routes.ReclamationsPage />}
          />
        }
      />
      <Route
        path="/reservations"
        element={
          <PageWrapper
            permissions={['CLIENT']}
            element={<routes.ReservationsPage />}
          />
        }
      />
      <Route
        path="/c/reports"
        element={
          <PageWrapper
            permissions={['CLIENT']}
            element={<routes.ClientReportPage />}
          />
        }
      />

      <Route
        path="/notifications"
        element={
          <PageWrapper
            permissions={['CLIENT']}
            element={<routes.NotificationsPage />}
          />
        }
      />

      {/* Global Part */}

      <Route path="/home" element={<routes.HomePage />} />
      <Route path="/" element={<routes.HomePage />} />

      <Route path="/article/:id" element={<routes.ArticlePage />} />
      <Route path="/about" element={<routes.AboutPage />} />
      <Route path="/contact" element={<routes.ContactPage />} />
      <Route path="/services" element={<routes.ServicesPage />} />
      <Route path="*" element={<routes.NotFoundPage />} />
    </Routes>
  )
}
export default AppRoutes

// let routes = (

//     <Route
//       exact
//       path="/expert"
//       render={props => <PageRoute {...props} route="Filtrer Resultats" />}
//     />
//     <Route path="/article/:id" exact>
//       <Article />
//     </Route>
//     <Route path="/expertpage/:expertId" exact>
//       <ExpertPage />
//     </Route>
//     <Route path="/expertreview/:expertId" exact>
//       <ExpertReviews />
//     </Route>
//     <Route path="/reservations" exact>
//       <MesReservationsPage />
//     </Route>
//     <Route path="/notifications" exact>
//       <NotificationPage />
//     </Route>
//     <Route path="/reclamations" exact>
//       <ReclamationPage />
//     </Route>
//     <Route path="/payment" exact>
//       <PaymentPage />
//     </Route>
//     <Route path="/paiements" exact>
//       <PaymentListPage />
//     </Route>
//     <Route
//       exact
//       path="/paymentcard"
//       render={props => <CardPaymentPage {...props} />}
//     />
//     <Route
//       exact
//       path="/transferPayment"
//       render={props => <TransferPaymentPage {...props} />}
//     />
//     <Route path="/demandemissions" exact>
//       <DemandeMissionsPage />
//     </Route>
//     <Route path="/missionspage" exact>
//       <MissionsPage />
//     </Route>
//     <Route path="/rapport/:id" exact>
//       <ReportVisitePage />
//     </Route>
//     <Route path="/profile" exact>
//       <ClientProfile />
//     </Route>
//     <Route path="/profileexpert" exact>
//       <ExpertProfile />
//     </Route>
//     <Route path="/profileexpert/:etat" exact>
//       <ExpertProfile />
//     </Route>
//     <Route path="/disponibilite" exact>
//       <DisponibilitePage />
//     </Route>
//     <Route path="/auth/reset/:token/:role" exact>
//       <Home />
//     </Route>
//     <Route path="/modifierprofile" exact>
//       <Profile />
//     </Route>
//     <Route path="/auth/verify/:tokenEmail/:role" exact>
//       <Home />
//     </Route>
//     <Route path="/rapporthistorique/:rapportId/pdf" exact>
//       <PdfRapport />
//     </Route>
//     <SocketContext.Provider value={socket}>
//       <Route path="/rapporthistorique" exact>
//         <HistoryReportPage />
//       </Route>
//     </SocketContext.Provider>

//     <Route render={() => <Redirect to="/" />} />
