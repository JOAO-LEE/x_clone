"use client";

import { Heart } from "@phosphor-icons/react";
import { DotsThree } from "@phosphor-icons/react/dist/ssr";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { app } from "../../../firebase";
import { useSession } from "next-auth/react";

export default function Reply({reply, postId, replyId}: { reply: any, postId: string, replyId: string}) {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likes, setLikes] = useState<Array<any>>([]);
  const {data: session} = useSession();
  const db = getFirestore(app);
  
  useEffect(() => {
    onSnapshot(collection(db, 'posts', postId, 'replies', replyId, 'likes'), (snapshot) => {
      setLikes(snapshot.docs);
      return;
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", postId, "replies", replyId, "likes", session.user.uid));
        return;
      }
      await setDoc(doc(db, "posts", postId, "replies", replyId, "likes", session.user.uid), 
        {
          uid: session.user.uid,
          timestamp: serverTimestamp(),
          username: session.user.username
        }
      )
      return;
    }
  }

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
        <div className="flex gap-1.5 text-gray-500">
          <Heart
          onClick={likePost} 
          size={"1rem"}
          weight={isLiked ? "fill" : "regular"}
          className={`cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100 ${isLiked ? "text-red-500" : "hover:text-red-500"} `} 
          />
          {
            !!likes.length 
            && 
              (
                <span className={`text-xs font-bold ${isLiked && "text-red-500"}`}>{likes.length}</span>
              )
          }
        </div>
      </div>
  </div>

  )
}