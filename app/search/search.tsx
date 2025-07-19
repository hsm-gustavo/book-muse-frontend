import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/ui/submit-button"
import { SearchIcon } from "lucide-react"
import Form from "next/form"

export default function Search() {
  return (
    <Form action="/search" className="max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for books, authors, or topics..."
            className="pl-10 border-accent-pink focus-visible:border-accent-pink focus-visible:ring-accent-pink/50 selection:bg-accent-pink"
            name="q"
          />
        </div>
        <SubmitButton />
      </div>
    </Form>
  )
}
