"use client"

import { ChatCircle, Heart, Repeat, Trash } from "@phosphor-icons/react";
import { doc, getFirestore, setDoc, serverTimestamp, onSnapshot, collection, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import {app} from "../../../firebase";
import { useEffect, useState } from "react";
// import { Like } from "@/model/Like";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";


function PostActions({ id, uid }: { id: string, uid: string }) {
  const {data: session } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likes, setLikes] = useState<Array<any>>([]);
  const [replies, setReplies] = useState<Array<any>>([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState)
  const db = getFirestore(app);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "replies"), (snapshot) => {
      setReplies(snapshot.docs)
    });
    return;
  }, [])

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
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
  };

  const openCommentModal = () => {
    if (session) {
      setOpen(!open)
      setPostId(id);
      return;
    }
  }

  const deletePost =  async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (session?.user.uid === uid) {
        deleteDoc(doc(db, 'posts', id));
        window.location.reload();
        return;
      }
      alert("You're not authorized to delete this post.")
    }
  };

  return (
    <div className="flex justify-start p-2 text-gray-500">
      <div  className="flex-grow flex gap-1.5 ">
        <ChatCircle
        onClick={openCommentModal}
        size={"1rem"} 
        className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100 hover:text-sky-500" 
        />
        {
          !!replies.length 
          &&
            (
              <span className="text-xs font-bold">{replies.length}</span>
            ) 
        }
      </div>
      <div  className="flex-grow flex ">
        <Repeat 
        size={"1rem"}
        className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-sky-100  hover:text-green-500" 
        />
      </div>
     <div className="flex items-center gap-1.5  flex-grow">
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
    {
      session?.user.uid === uid 
      &&
        (
          <div  className="flex-grow flex ">
            <Trash 
            size={"1rem"}
            className="cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-red-500 hover:text-white"
            onClick={deletePost} 
            />
          </div>
        )
    }
    </div>
  )
}

export default PostActions