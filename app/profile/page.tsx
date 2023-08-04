"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { UserContext } from "@context/UserContext";
import { database } from "@utils/firebase";
import { ref, onValue, remove } from "firebase/database";

const MyProfile = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState<PromptProps[] | null | undefined>(null);

  useEffect(() => {
    const feedRef = ref(database, 'prompts/');
    onValue(feedRef, (snapshot) => {
      const data: PromptProps = snapshot.val();
     
      const filteredPosts = Object.values(data).filter((item: PromptProps) => item.creator_id === user?.uid);
      setMyPosts(filteredPosts);
      console.log(Object.entries(data));
      console.log(Object.entries(data).map(prompt => prompt[1]));
    });
  }, [user?.uid]);

  const handleEdit = (post: PromptProps) => {
    router.push(`/update-prompt?id=${post.prompt_id}`);
  };

  const handleDelete = async (post: PromptProps) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      const promptRef = ref(database, `prompts/` + post.prompt_id);
      remove(promptRef).then((result) => {
        console.log(result);
        const filteredPosts = myPosts?.filter((item: PromptProps) => item.prompt_id !== post.prompt_id);
        setMyPosts(filteredPosts);
      }).catch(error => {
        console.log(error);
      });
    }
  };

  if(!user) {
    router.push("/");
    return;
  }

  return (
    <Profile
      name={user.displayName}
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;