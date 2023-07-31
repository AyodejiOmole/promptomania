"use client";
import { useState, useContext, ReactEventHandler, ReactHTMLElement, ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { UserContext } from "@context/UserContext";
// import { v4 as uuiv4 } from "uuid";

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

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: user?.uid,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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