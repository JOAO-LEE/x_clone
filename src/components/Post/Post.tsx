import { DotsThree } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"


function Post({ post }: { post: any }) {
  return (
    <div className="flex p-3 border-b border-gray-200">
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
          <p>{post.postText}</p>
        </Link>
        {
          post.imageFileUrl !== null 
          &&
            (
              <Link href={`/posts/${post.id}`}>
                <img src={post.imageFileUrl} alt="" />
              </Link>
            ) 
        }
      </div>
    </div>
  )
}

export default Post