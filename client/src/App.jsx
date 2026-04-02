import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { CareersPage } from './pages/CareersPage'
import { CareerApplyPage } from './pages/CareerApplyPage'
import { CareerOtherApplyPage } from './pages/CareerOtherApplyPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/work" element={<Navigate to="/projects" replace />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/apply/other" element={<CareerOtherApplyPage />} />
          <Route path="/careers/apply/:roleId" element={<CareerApplyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
