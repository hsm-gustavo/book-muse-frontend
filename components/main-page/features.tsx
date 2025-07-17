import {
  BookOpen,
  Users,
  Star,
  TrendingUp,
  MessageSquare,
  Heart,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { AnimatedCard } from "../ui/animated-card"
import { AnimatePresence } from "motion/react"

const features = [
  {
    icon: BookOpen,
    title: "Personal Library",
    description:
      "Organize your reading list with custom shelves and categories. Track your progress and set reading goals.",
    color: "bg-pastel-blue",
    iconColor: "text-blue-600",
  },
  {
    icon: Star,
    title: "Smart Reviews",
    description:
      "Write detailed reviews with ratings, tags, and mood indicators. Discover books through intelligent recommendations.",
    color: "bg-pastel-yellow",
    iconColor: "text-yellow-600",
  },
  {
    icon: Users,
    title: "Reading Community",
    description:
      "Connect with fellow book lovers, join reading clubs, and participate in literary discussions.",
    color: "bg-pastel-green",
    iconColor: "text-green-600",
  },
  {
    icon: MessageSquare,
    title: "Book Discussions",
    description:
      "Engage in thoughtful conversations about your favorite books with spoiler-free discussion threads.",
    color: "bg-pastel-pink",
    iconColor: "text-pink-600",
  },
  {
    icon: Heart,
    title: "Lists",
    description:
      "Create lists for future reads, books that you want to ignore or books that you already read.",
    color: "bg-pastel-orange",
    iconColor: "text-orange-600",
  },
]

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Everything You Need to{" "}
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Love Reading More
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {features.map((feature, index) => (
              <AnimatedCard
                key={index}
                className="border-0 shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 bg-white/80"
                delay={0.2}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </AnimatedCard>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
