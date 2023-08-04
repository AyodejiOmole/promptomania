"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@context/UserContext";
import { usePathname, useRouter } from "next/navigation";

interface PromptCardProps {
  post: PromptProps,
  handleEdit?: () => void,
  handleDelete?: () => void,
  handleTagClick?: (tagName: string) => void
}

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }: PromptCardProps) => {
  const { user } = useContext(UserContext);
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState<boolean | string>("");

  const handleProfileClick = () => {
    console.log(post);

    // if (post.creator._id === user?.uid) return router.push("/profile");

    // router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator_image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator_id}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator_id}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {user?.uid === post.creator_id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;