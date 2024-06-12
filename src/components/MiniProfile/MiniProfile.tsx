import { DotsThree } from "@phosphor-icons/react";
import { Session, User } from "next-auth";

function MiniProfile({session}: {session: Session}) {
  return (
    <div className="text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200">
      <img src={session.user.image} alt="user image" className="h-10 w-10 rounded-full xl:mr-2"/>
      <div className="hidden xl:inline">
        <h4 className="font-bold">{session.user.name}</h4>
        <p className="text-gray-500">@{session.user.username}</p>
      </div>
      <DotsThree  className="h-5 hidden xl:inline xl:ml-8"/>
    </div>
  )
}

export default MiniProfile