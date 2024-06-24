"use client"

import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import { X } from "@phosphor-icons/react";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { app } from "../../../firebase";
import { addDoc, collection, doc, getFirestore, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Post } from "@/model/Post";
import CommonButton from "../Button/Button";
import { useRouter } from "next/navigation";


export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const { data: session } = useSession();
  const [post, setPost] = useState<Post>();
  const [reply, setReply] = useState("");
  const router = useRouter();
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

  const sendReply = async () => {
    try {
      const docRef = await addDoc(collection(db, 'posts', postId, "replies"), 
      {
        name: session?.user.name,
        uid: session?.user.uid,
        username: session?.user.username,
        profileImage: session?.user.image,
        timestamp: serverTimestamp(),
        reply
      }
    )
    setOpen(false);
    setReply("");
    router.push(`/posts/${postId}`)

      
    } catch (error) {
      console.log(error)
    }
  }

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
                 <div className="w-full divide-y divide-gray-200">
                  <div>
                      <textarea 
                      className="w-full border-none outline-none tracking-wide resize-none text-gray-700 placeholder:text-gray-500 min-h-[50px]"
                      placeholder="Post your reply"
                      rows={2}
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      >
                      </textarea>
                      </div>
                      <div className="flex items-center justify-end pt-2.5">
                        <CommonButton 
                        disabled={reply.trim() === ""}
                        functionality={sendReply}
                        text="Reply"
                        />
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