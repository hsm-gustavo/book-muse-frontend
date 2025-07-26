import LoadingDots from "@/components/loading-dots"

export default function Loading() {
  return (
    <div className="min-h-screen gradient-pastel">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <LoadingDots />
          </div>
        </div>
      </main>
    </div>
  )
}
