import { Fragment } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { JourneyIntro, ScrollProgress } from './components/Journey'
import DestinationSection from './components/DestinationSection'
import MapFlight from './components/MapFlight'
import MoreDestinations from './components/MoreDestinations'
import QuotePlan from './components/QuotePlan'
import Footer from './components/Footer'
import { stops } from './data/journey'

export default function App() {
  return (
    <div className="min-h-screen overflow-clip bg-ink">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <ScrollProgress />
      <main id="main">
        <Hero />
        <JourneyIntro />
        {stops.map((stop, i) => (
          <Fragment key={stop.id}>
            <DestinationSection destination={stop} />
            {i < stops.length - 1 && <MapFlight index={i} />}
          </Fragment>
        ))}
        <MoreDestinations />
        <QuotePlan />
      </main>
      <Footer />
    </div>
  )
}
