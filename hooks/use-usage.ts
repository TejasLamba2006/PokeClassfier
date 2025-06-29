"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export function useUsage() {
  const { data: session } = useSession()

  return useQuery({
    queryKey: ["usage", session?.user?.id],
    queryFn: async () => {
      const response = await fetch("/api/usage")
      if (!response.ok) throw new Error("Failed to fetch usage")
      return response.json()
    },
    enabled: !!session?.user,
  })
}
