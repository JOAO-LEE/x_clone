"use client";

import { Post } from "@/model/Post";
import { DotsThree } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Reply({reply}: {reply: any}) {
  console.log(reply)
  return (
    <div className="flex p-3 border-b border-gray-20 hover:bg-gray-50 transition pl-10">
    <img 
    src={reply.profileImage} 
    alt={`$${reply.username} image`}
    className="rounded-full h-9 w-9 mr-4" 
    />
    <div className="flex-1">
      <div 
      className="flex items-center justify-between">
        <div className="flex gap-1 items-center whitespace-nowrap">
          <h4 className="font-bold text-sm truncate">{reply.name}</h4>
          <span className="text-xs">@{reply.username}</span>
        </div>
        <DotsThree 
        className="text-sm"
        />
      </div>
      <Link href={`/posts/${reply.id}`}>
        <p className="text-gray-800 text-xs my-3">{reply.reply}</p>
      </Link>
      {
        reply.hasOwnProperty("imageFileUrl") && reply.imageFileUrl !== null 
        &&
          (
            <Link href={`/posts/${reply.id}`}>
              <img 
              src={reply.imageFileUrl} 
              alt="post-img" 
              className="rounded-2xl mr-2" 
              />
            </Link>
          ) 
      }
    </div>
  </div>

  )
}