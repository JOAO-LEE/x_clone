import { XLogo, House } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="flex flex-col gap-4 p-3">
      <Link href="/">
        <XLogo 
        className="w-16 h-16 p-3 hover:bg-gray-100 rounded-full transition duration-200"
        /> 
      </Link>
      <Link href="/" 
      className="flex gap-2 items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-fit">
        <House 
        className="w-7 h-7" weight="fill"
        />
        <span 
        className="font-bold hidden xl:inline">
          Home
        </span>
      </Link>
      <button className="bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline font-semibold">Sign in</button>
    </div>
  )
}

export default Sidebar