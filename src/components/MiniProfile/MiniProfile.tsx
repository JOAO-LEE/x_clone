import { DotsThree } from "@phosphor-icons/react";
import { Session, User } from "next-auth";

function MiniProfile({ session }: { session: Session }) {
  return (
    <div className="text-gray-700 text-sm lg:flex gap-2 items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200">
      <img src={session.user.image} alt="user image" className="hidden md:inline md:h-8 md:w-8 lg:h-10 lg:w-10  rounded-full"/>
      <div className="hidden lg:inline">
        <h4 className="font-bold">{session.user.name}</h4>
        <p className="text-gray-500">@{session.user.username}</p>
      </div>
      <DotsThree  className="h-5 hidden lg:inline xl:ml-8"/>
    </div>
  )
}

export default MiniProfile