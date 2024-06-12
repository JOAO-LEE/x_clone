"use client"

import { ImageSquare } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";

function CreateInput() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img 
      src={session.user.image} 
      alt="user image" 
      className="h-11 w-11 rounded-full cursor-point hover:brightness-75 transition"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea 
        name="What's happening?" 
        rows={2}
        className="border-none w-full outline-none tracking-wide min-h-[3.125rem] text-gray-700"
        >
        </textarea>
        <div className="flex items-center justify-between pt-2.5">
          <ImageSquare className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreateInput