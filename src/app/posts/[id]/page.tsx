import { Params } from "@/model/Params";
import { app } from "../../../../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Post } from "@/model/Post";
import Back from "@/components/Back/Back";
import SinglePost from "@/components/Post/Post";
import Replies from "@/components/Replies/Replies";

export default async function Posts({ params }: Params) {
  const db = getFirestore(app);
  console.log(params)
  let postData: Post;
  const querySnapshot = await getDoc(doc(db, "posts", params!.id));
  // console.log(querySnapshot)
  postData = {...querySnapshot.data() as Post, id: querySnapshot.id};

  console.log(postData)
  
  return (
    <section className="max-w-xl mx-auto border-r border-l min-h-screen">
      <Back />
      <SinglePost post={postData} id={postData?.id!}/>
      <Replies id={params!.id} />
    </section>
  )
}   