"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { child, get, ref, set } from "firebase/database";
import { database } from "@utils/firebase";
import Image from "next/image";
import { UserContext } from "@context/UserContext";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const { user } = useContext(UserContext);

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);
  const [fullPost, setFullPost] = useState<PromptProps>();

  useEffect(() => {
    const getPromptDetails = () => {
      const databaseRef = ref(database);
      get(child(databaseRef, `prompts/${promptId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setFullPost(snapshot.val());
          setPost({prompt: snapshot.val().prompt, tag: snapshot.val().tag});
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    set(ref(database, 'prompts/' + promptId), {
          creator_id: fullPost?.creator_id,
          prompt: post.prompt,
          tag: post.tag,
          creator_image: fullPost?.creator_image,
          prompt_id: promptId
    }).then(() => {
        // The user is navigated to the dashboard once the collection in the database has been created.  
        alert("Prompt updated successfully!");
        router.push("/");
        setIsSubmitting(false);
    }).catch((error) => {
        console.log(error.message);
        setIsSubmitting(false);
    });
  };

  if(!fullPost) {
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

  if(!user) {
    router.push("/");
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;