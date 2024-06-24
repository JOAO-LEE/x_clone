import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

function Back() {
  return (
    <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
      <Link href={"/"} className="hover:bg-gray-100 rounded-full p-2">
        <ArrowLeft size={"1.25rem"}/>
      </Link>
      <h2 className="sm:text-lg">Back</h2>
    </div>
  )
}

export default Back;