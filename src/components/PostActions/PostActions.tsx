"use client"

import { ChatCircle, Heart, Repeat, Trash } from "@phosphor-icons/react"

function PostActions() {
  return (
    <div className="flex justify-between gap-5 p-2 text-gray-500">
      <ChatCircle
      size={"1rem"} 
      className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100 hover:text-sky-500" 
      />
      <Repeat 
      size={"1rem"}
      className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100  hover:text-green-500" 
      />
      <Heart 
      size={"1rem"}
      className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100 hover:text-red-500 " 
      />
      <Trash 
      size={"1rem"}
      className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100 hover:text-sky-500" 
      />
    </div>
  )
}

export default PostActions