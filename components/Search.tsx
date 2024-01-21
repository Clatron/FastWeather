'use client'

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchForecast } from "@/lib/actions/forecast.action"
import { Forecast } from "@/types"

const Search = () => {
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch] = useState("")

  const { isPending, error, data, refetch } = useQuery<Forecast>({
    queryKey: ['forecast'],
    queryFn: function () {
      setSubmitting(false)

      if (search === "") throw new Error("Field cannot be empty")
      setSearch("")
      return fetchForecast(search)
    },
    retry: false,
    enabled: !!submitting,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5
  })

  return (
    <div className="flex relative justify-center items-center space-x-2">
      <Input value={search} className="w-[250px] max-sm:w-[150px]" type="text" placeholder="Search for a city / e.g: London" onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={() => setSubmitting(true)} type="submit" disabled={isPending}>Search</Button>
    </div>
  )
}

export default Search