import { Suspense } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store, { history } from './store'
import Loading from './shared/components/Loading'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import Footer from './shared/components/Footer'
import Header from './shared/components/Header'
import { SocketProvider } from './socket'
import AppRoutes from './routes'
import { Toaster } from 'react-hot-toast'
import GoogleMapsContainer from './shared/components/GoogleMaps/Container'
import { useInitModels, useLoadUser } from 'app/store/hooks'
import ErrorBoundary from './shared/components/ErrorBoundary'
function Main() {
  useLoadUser()
  useInitModels()
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  )
}
function App() {
  return (
    <GoogleMapsContainer>
      <Suspense fallback={<Loading />}>
        <div className="bg-[#F6F9FC]">
          <ReduxProvider store={store}>
            <SocketProvider>
              <Toaster
                toastOptions={{
                  success: {
                    style: {
                      color: '#fff',
                      background: 'green',
                    },
                  },
                  error: {
                    style: {
                      color: '#fff',
                      background: 'red',
                    },
                  },
                }}
              />
              <Router history={history}>
                <Main />
              </Router>
            </SocketProvider>
          </ReduxProvider>
        </div>
      </Suspense>
    </GoogleMapsContainer>
  )
}
export default App
