import CTA from "@/components/main-page/cta"
import Features from "@/components/main-page/features"
import Hero from "@/components/main-page/hero"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}
