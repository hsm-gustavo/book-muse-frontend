import { BookSearchResponse } from "@/lib/types/book"
import Search from "./search"
import Books from "./books"
import { API_URL } from "@/lib/constants"

export default async function SearchPage(props: {
  searchParams: Promise<{ q: string; page: string }>
}) {
  const searchParams = await props.searchParams

  const url = new URL(`${API_URL}/books/search`)
  const query = searchParams.q || ""
  url.searchParams.set("q", encodeURIComponent(query))

  const page = searchParams.page || "1"
  url.searchParams.set("page", page)

  const searchResponse = await fetch(url.toString())
  const searchResult: BookSearchResponse = await searchResponse.json()

  return (
    <div className="min-h-screen gradient-pastel">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Search Books</h1>
            <p className="text-muted-foreground text-lg">
              Discover your next favorite book from millions of titles
            </p>
          </div>

          <Search />
          <Books query={searchParams.q} results={searchResult} />
        </div>
      </main>
    </div>
  )
}
