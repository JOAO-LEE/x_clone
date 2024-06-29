"use client";

import { useEffect, useState } from "react";
import { app } from "../../../firebase";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { Post } from "@/model/Post";
import Reply from "../Reply/Reply";

function Replies({ id }: { id: string }) {
  const db = getFirestore(app);
  const [replies, setReplies] = useState<Array<Post>>([]);

  useEffect(() => {
    const q = query(collection(db, "posts", id, "replies"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      {
        const fetchedReplies: Post[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Post
        }));
        setReplies(fetchedReplies);
      } 
    );
    
    return () => unsubscribe();
  }, [db, id]);

  return (
    <>
      {
        !!replies.length
        &&
          <>
            {
              replies.map((reply, index) =>  (
                <Reply 
                postId={id}
                replyId={reply.id!}
                reply={reply} 
                key={index}
                />
              ))
            }
          </>
      }
    </>
  )
}

export default Replies;