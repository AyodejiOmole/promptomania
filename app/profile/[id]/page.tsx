"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { database } from "@utils/firebase";
import { onValue, ref } from "firebase/database";
import Image from "next/image";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  // const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<PromptProps[]>([]);
  const [userName, setUserName] = useState();

  useEffect(() => {
    const feedRef = ref(database, 'prompts/');
    onValue(feedRef, (snapshot) => {
      const data: PromptProps = snapshot.val();
      const filteredPosts = Object.values(data).filter((item: PromptProps) => item.creator_id === params.id);

      setUserPosts(filteredPosts);
      setUserName(filteredPosts[0].creator_name);
    });
  }, [params.id]);

  if(!userName) {
    return (
      <div className='w-full flex-center'>
        <Image
          src='/assets/icons/loader.svg'
          width={50}
          height={50}
          alt='loader'
          className='object-contain'
        />
      </div>
    );
  }

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be awed by the creative and inspiring power of their imagination and mind!`}
      data={userPosts}
    />
  );
};

export default UserProfile;