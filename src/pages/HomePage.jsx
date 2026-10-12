import { useEffect } from 'react'
import { useHomepageSmoothScroll } from '../hooks/useHomepageSmoothScroll'
import {
  HomeHeroSection,
  HomeProblemsSection,
  HomeWhatWeBuildSection,
  HomeSolutionsSection,
  HomeHowWeWorkPreviewSection,
  HomeIndustriesPreviewSection,
  HomeOutcomesSection,
  HomeFinalCtaSection,
} from '../components/sections/HomeSections'

export function HomePage() {
  useHomepageSmoothScroll()

  useEffect(() => {
    const sections = document.querySelectorAll(
      '#home-hero, #problem-section, #what-we-build-section, #solutions-section, #how-we-work-section, #industries-section, #outcomes-section, #final-cta-section',
    )

    const infiniteAnimations = new Map(
      [...sections].map(section => [
        section,
        section.getAnimations({ subtree: true })
          .filter(animation => animation.effect?.getTiming().iterations === Infinity),
      ]),
    )

    const setInfiniteAnimationsPaused = (section, paused) => {
      infiniteAnimations.get(section)?.forEach(animation => {
        if (paused) animation.pause()
        else animation.play()
      })
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setInfiniteAnimationsPaused(entry.target, !entry.isIntersecting)
      })
    })

    sections.forEach(section => {
      setInfiniteAnimationsPaused(section, true)
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <HomeHeroSection />
      <HomeProblemsSection />
      <HomeWhatWeBuildSection />
      <HomeHowWeWorkPreviewSection />
      <HomeSolutionsSection />
      <HomeIndustriesPreviewSection />
      <HomeOutcomesSection />
      <HomeFinalCtaSection />
    </>
  )
}
