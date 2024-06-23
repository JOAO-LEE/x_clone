import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { app } from "../../../firebase";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import Post from "../Post/Post";
import { Suspense } from "react";

export default async function Feed() {
  const db = getFirestore(app);
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  const querySnapshgot = await getDocs(q);
  let posts: Array<any> = [];
  querySnapshgot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });

  return (
    <section>
      {
        posts.map((post) => (
          <Post
          id={post.id} 
          key={post.id}
          post={post}
          />
        ))
      }
    </section>
  )
}