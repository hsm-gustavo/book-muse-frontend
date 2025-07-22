import { AnimatedCard } from "@/components/ui/animated-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { UserSearchResult } from "@/lib/types/user"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface UserComponentProps {
  user: UserSearchResult
}

export default function UserComponent({ user }: UserComponentProps) {
  const [joinedDate, setJoinedDate] = useState(
    new Date(user.createdAt).toDateString()
  )

  useEffect(() => {
    setJoinedDate(new Date(user.createdAt).toLocaleDateString())
  }, [user.createdAt])

  return (
    <Link href={`/users/${user.id}`}>
      <AnimatedCard className="transition-all hover:shadow-lg hover:scale-[1.02]">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Joined {joinedDate}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </AnimatedCard>
    </Link>
  )
}
