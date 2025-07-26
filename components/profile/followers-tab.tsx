import { UserProfile } from "@/lib/types/user"
import { AnimatedCard } from "../ui/animated-card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CardContent } from "../ui/card"
import { TabsContent } from "../ui/tabs"

interface FollowersTabProps {
  userProfile: UserProfile
}

export default function FollowersTab({ userProfile }: FollowersTabProps) {
  return (
    <TabsContent value="followers" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userProfile.followers.users.map((follower) => (
          <AnimatedCard key={follower.id}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={follower.profilePicture}
                    alt={follower.name}
                  />
                  <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{follower.name}</h3>
                  <p className="text-sm text-gray-500">{follower.email}</p>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>
    </TabsContent>
  )
}
