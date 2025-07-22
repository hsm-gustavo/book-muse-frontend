import SearchForm from "./search-form"

export default function SearchUsersPage() {
  return (
    <div className="min-h-screen gradient-pastel">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Find Users</h1>
              <p className="text-muted-foreground">
                Discover and connect with other book enthusiasts
              </p>
            </div>
            <SearchForm />
          </div>
        </div>
      </main>
    </div>
  )
}
