import { SiGithub } from "@icons-pack/react-simple-icons"
import { BookOpen } from "lucide-react"
import Link from "next/link"

const footerLinks = [
  {
    caption: "GitHub",
    icon: <SiGithub className="h-5 w-5" />,
    link: "https://github.com/hsm-gustavo/link-do-repo",
  },
]

const quickLinks = [
  {
    name: "Browse Books",
    href: "#", // change later maybe
  },
  {
    name: "Top Reviews",
    href: "#", // change later maybe
  },
  {
    name: "Reading Lists",
    href: "#", // change later maybe
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">BookMuse</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your personal book universe where stories come alive and readers
              connect. Discover, review, and share your literary journey with a
              passionate community.
            </p>
            <div className="flex space-x-4">
              {footerLinks.map((link, index) => (
                <Link
                  href={link.link}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  title={link.caption}
                  key={index}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} BookMuse. Made with ❤️ for book lovers
            everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
