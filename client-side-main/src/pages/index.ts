// <Route path="*" element={<h1>404</h1>} />
// <Route path="/home" element={<HomePage />} />
// <Route path="/experts" element={<ExpertsPage />} />
// <Route path="/experts/:id" element={<ExpertPage />} />
// <Route path="" element={<Profile />} />
// <Route path="/reservations" element={<ExpertReservationsPage />} />
// <Route path="/missions" element={<ExpertMissionsPage />} />
// <Route path="/reclamations" element={<h1>reclamations</h1>} />
// <Route path="/rapports" element={<h1>Rapports de diagnostique</h1>} />

import { lazy } from 'react'
export const HomePage = lazy(() => import('./home'))
export const ExpertsPage = lazy(() => import('./experts'))
export const ExpertPage = lazy(() => import('./expert'))
export const ReservationsPage = lazy(() => import('./reservations'))
export const ExpertMissionsPage = lazy(() => import('./missions'))
export const OngoingMissionsPage = lazy(() => import('./ongoing-missions'))
export const AvailabilityPage = lazy(() => import('./availability'))
export const ReportsHistoryPage = lazy(() => import('./reports-history'))
export const ReportPage = lazy(() => import('./report-page'))
export const ProfilePage = lazy(() => import('./profile'))
export const ArticlePage = lazy(() => import('./article'))
export const AboutPage = lazy(() => import('./about'))
export const ServicesPage = lazy(() => import('./services'))
export const ContactPage = lazy(() => import('./contact'))
export const SettingsPage = lazy(() => import('./settings'))
export const ReclamationsPage = lazy(() => import('./reclamations'))
export const ClientReportPage = lazy(() => import('./client-reports'))
export const ResetPasswordPage = lazy(() => import('./reset-password'))
export const BuyCreditesPage = lazy(() => import('./buy-credits'))
export const NotificationsPage = lazy(() => import('./notifications'))
export const NotFoundPage = lazy(() => import('./NotFound/NotFound'))
