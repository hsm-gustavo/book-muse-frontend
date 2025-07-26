import { UserProfile } from "@/lib/types/user"
import { AnimatedCard } from "../ui/animated-card"
import { CardContent } from "../ui/card"
import { TabsContent } from "../ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface FollowingTabProps {
  userProfile: UserProfile
}

export default function FollowingTab({ userProfile }: FollowingTabProps) {
  return (
    <TabsContent value="following" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userProfile.following.users.map((following) => (
          <AnimatedCard key={following.id}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={following.profilePicture}
                    alt={following.name}
                  />
                  <AvatarFallback>{following.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{following.name}</h3>
                  <p className="text-sm text-gray-500">{following.email}</p>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>
    </TabsContent>
  )
}
