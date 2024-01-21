import Image from "next/image"
import Search from "./Search"

const NavBar = () => {
  return (
    <nav className="w-full max-w-[1440px] flex justify-between relative items-center py-8 z-20">
      <div className="flex justify-start items-center gap-2">
        <Image src={'Sun.svg'} alt="Logo" width={50} height={50} />
        <h1 className="h2-medium">Fast<span className=" text-blue-400">Weather</span></h1>
      </div>
      <Search />
    </nav>
  )
}

export default NavBar