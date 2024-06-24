"use client"

import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import { X } from "@phosphor-icons/react";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { app } from "../../../firebase";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { Post } from "@/model/Post";


export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const { data: session } = useSession();
  const [post, setPost] = useState<Post>();
  const db = getFirestore(app);

  useEffect(() => {
    if (postId !== "") {
      const postRef = doc(db, "posts", postId);
      const unsubscribe = onSnapshot(
        postRef,
        (snapshot) => {
        if (snapshot.exists()) {
          // const how
          setPost(snapshot.data() as Post);
          return;
        }
        console.log("No such document"); 
      })
      return () => unsubscribe();
    }
  }, [postId]);

  return (
    <>
      {
        open 
        &&
          (
            <Modal
            shouldCloseOnEsc
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            ariaHideApp={false}
            className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-b border-gray-200 rounded-md p-4"
            >
              <div className="p-4">
                <div className="border-b border-gray-200 py-2 px-1.5">
                  <div
                  className="text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer w-min">
                  <X 
                  onClick={() => setOpen(false)}
                  />
                  </div>
                </div>
                <div className="flex p-2 items-center space-x-1 relative">
                  <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
                  <img
                  className="h-11 w-11 rounded-full mr-4" 
                  src={post?.profileImage} 
                  alt="" 
                  />
                  <h4 className="font-bold sm:text-[16px] text-[15px] hover:underline truncate">{post?.name}</h4>
                  <span className="text-sm sm:text-[15px] truncate">@{post?.username}</span>
                </div>
                <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.postText}</p>
                <div className="flex p-3 space-x-3">
                  <img 
                  src={session?.user.image} 
                  alt=""
                  className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" 
                  />
                  <div>
                    <textarea 
                    className="w-full border-none outline-none tracking-wide resize-none text-gray-700 placeholder:text-gray-500"
                    placeholder="Post your reply"
                    rows={2}
                    >
                    </textarea>
                    <div className="flex items-center justify-end pt-2.5">
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )
      }
    </>
  )
}