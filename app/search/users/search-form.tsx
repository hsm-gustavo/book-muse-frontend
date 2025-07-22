"use client"

import LoadingDots from "@/components/loading-dots"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { searchUsers } from "@/lib/api"
import { UserSearchResponse } from "@/lib/types/user"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Calendar, SearchIcon, Users } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useInView } from "react-intersection-observer"
import { useDebounce } from "use-debounce"
import UserComponent from "./user-component"

export default function SearchForm() {
  const { register, watch } = useForm<{ q: string }>({
    defaultValues: { q: "" },
  })

  const query = watch("q")
  const [debouncedQuery] = useDebounce(query, 300)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<UserSearchResponse>({
    queryKey: ["users", debouncedQuery],
    queryFn: ({ pageParam }) =>
      searchUsers(debouncedQuery, pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const users = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <>
      <form className="mb-8">
        <div className="relative max-w-md mx-auto">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users by name or email..."
            className="pl-10 pr-4 border-accent-pink focus-visible:border-accent-pink focus-visible:ring-accent-pink/50 selection:bg-accent-pink"
            {...register("q")}
          />
        </div>
      </form>
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }, (_, i) => (
            <AnimatedCard key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      )}
      {users.length > 0 && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {users.map((user) => (
              <UserComponent key={user.id} user={user} />
            ))}
          </div>
          <div ref={ref} className="h-10" />
          {isFetchingNextPage && <LoadingDots className="w-2 h-2" />}
        </div>
      )}
      {!users && !isLoading && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No users found</h3>
          <p className="text-muted-foreground">
            {query ? `No users found matching "${query}"` : "No users found"}
          </p>
        </div>
      )}
    </>
  )
}
