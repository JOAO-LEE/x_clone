import { XLogo, House } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

function Sidebar() {
  return (
    <div 
    className="flex flex-col gap-4 p-3 w-64"
    >
      <Link 
      href="/" 
      className="w-fit"
      >
        <XLogo
        className="w-[3.7rem] h-[3.7rem] p-3 hover:bg-gray-100 rounded-full transition duration-200"
        /> 
      </Link>
      <Link 
      href="/" 
      className="flex gap-2 items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-full"
      >
        <House 
        className="w-8 h-8" weight="fill"
        />
        <span 
        className="font-bold hidden xl:inline"
        >
          Home
        </span>
      </Link>
      <button 
      className="bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline font-semibold"
      >
        Sign in
      </button>
    </div>
  )
}

export default Sidebar