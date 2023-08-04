"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { UserContext } from "@context/UserContext";
import { database } from "@utils/firebase";
import { set, ref } from "firebase/database";
import { v4 as uuiv4 } from "uuid";

export interface NewPostProps {
    prompt: string,
    tag: string
}

const CreatePrompt = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<NewPostProps>({ prompt: "", tag: "" });

  const createPrompt = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    set(ref(database, 'prompts/' + uuiv4()), {
          creator_id: user?.uid,
          prompt: post.prompt,
          tag: post.tag,
          creator_image: user?.photoURL
    }).then(() => {
        // The user is navigated to the dashboard once the collection in the database has been created.  
        alert("Prompt created successfully!");
        router.push("/");
        setIsSubmitting(false);
    }).catch((error) => {
        console.log(error.message);
        setIsSubmitting(false);
    });
  };

  if(!user) {
    router.push("/");
    return;
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;