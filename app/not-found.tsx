import { Navbar } from "@/components/layout/navbar"
import { NotFound } from "@/components/ui/not-found"
import { PageTransition } from "@/components/ui/page-transition"

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-purple/30">
        <Navbar />
        <NotFound />
      </div>
    </PageTransition>
  )
}
