'use client'

import NavBar from "@/components/NavBar"

import Providers from "@/context"

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="px-4 sm:px-8 xl:px-16 mx-auto pb-16">
      <Providers>
        <NavBar />
        {children}
      </Providers>
    </main>
  )
}

export default layout