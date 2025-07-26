import LoadingDots from "@/components/loading-dots"

export default function Loading() {
  return (
    <div className="min-h-screen gradient-pastel flex items-center justify-center">
      <div className="pt-20 container mx-auto px-4 py-8 max-w-4xl">
        <LoadingDots />
      </div>
    </div>
  )
}
