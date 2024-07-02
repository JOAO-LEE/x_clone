import { DotsThree, User } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import PostActions from "../PostActions/PostActions"

function Post({ post, id }: { post: any, id: string }) {
  return (
    <div className="flex p-3 border-b border-gray-20 hover:bg-gray-50 transition">
    {
      post.profileImage
      ?
        (
          <img 
          src={post.profileImage} 
          alt={`$${post.username} image`}
          className="rounded-full h-11 w-11 mr-4" 
          />
        )
      :
        (
          <User />
        )
    }
      <div className="flex-1">
        <div 
        className="flex items-center justify-between">
          <div className="flex gap-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{post.name}</h4>
            <span className="text-xs">@{post.username}</span>
          </div>
          <DotsThree 
          className="text-sm"
          />
        </div>
        <Link href={`/posts/${post.id}`}>
          <p className="text-gray-800 text-sm my-3">{post.postText}</p>
        </Link>
        {
          post.imageFileUrl !== null 
          &&
            (
              <Link href={`/posts/${post.id}`}>
                <img 
                src={post.imageFileUrl} 
                alt="post-img" 
                className="rounded-2xl mr-2" 
                />
              </Link>
            )
        }
        <PostActions 
        id={id} 
        uid={post.uid}
        />
      </div>
    </div>
  )
}

export default Post