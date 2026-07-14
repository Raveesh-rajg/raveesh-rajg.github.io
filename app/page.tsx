import { Nav } from '@/components/nav'
import { ScrollProgress } from '@/components/ui'
import { Hero, CredibilityStrip } from '@/components/hero'
import { About, ExpertiseGrid, AnalyticsPhilosophy, WorkProcess, GitHubMetrics, Footer } from '@/components/sections'
import { FeaturedProjects, Contact } from '@/components/projects'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <CredibilityStrip />
        <About />
        <ExpertiseGrid />
        <FeaturedProjects />
        <AnalyticsPhilosophy />
        <GitHubMetrics />
        <WorkProcess />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
