export async function fetchWithCreds<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}
