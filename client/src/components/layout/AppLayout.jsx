import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { SkipLink } from './SkipLink'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

export function AppLayout() {
  return (
    <div className="relative min-h-svh bg-rbn-void">
      <ScrollToTop />
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
