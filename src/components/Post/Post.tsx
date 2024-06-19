import { DotsThree } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import PostActions from "../PostActions/PostActions"


function Post({ post }: { post: any }) {
  return (
    <div className="flex p-3 border-b border-gray-20 hover:bg-gray-50 transition">
      <img 
      src={post.profileImage} 
      alt={`$${post.username} image`}
      className="rounded-full h-11 w-11 mr-4" 
      />
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
        <PostActions />
      </div>
    </div>
  )
}

export default Post