"use client"

import { ChatCircle, Heart, Repeat, Trash } from "@phosphor-icons/react";
import { doc, getFirestore, setDoc, serverTimestamp, onSnapshot, collection, QueryDocumentSnapshot, CollectionReference, deleteDoc } from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import {app} from "../../../firebase";
import { useEffect, useState } from "react";
import { Like } from "@/model/Like";


function PostActions({ id }: { id: string }) {
  const {data: session } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likes, setLikes] = useState<Array<any>>([]);
  const db = getFirestore(app);


  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      console.log(snapshot.docs);
      setLikes(snapshot.docs);
      return;
    });

  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);

  }, [likes]);
 
  const likePost = async (): Promise<void> => {
    if (session) {

      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        return;
      }
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), 
        {
          uid: session.user.uid,
          timestamp: serverTimestamp(),
          username: session.user.username
        }
      )
      return;
    }
    // signIn();
  };

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
     <div className="flex items-center gap-1.5">
      <Heart
        onClick={likePost} 
        size={"1rem"}
        weight={isLiked ? "fill" : "regular"}
        className={`cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100 ${isLiked ? "text-red-500" : "hover:text-red-500"}`} 
        />
        {
          !!likes.length 
          && 
            (
              <span className={`text-xs font-bold ${isLiked && "text-red-500"}`}>{likes.length}</span>
            )
        }
     </div>
      {/* <Trash 
      size={"1rem"}
      className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100 hover:text-sky-500" 
      /> */}
    </div>
  )
}

export default PostActions