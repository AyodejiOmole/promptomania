import { NextRequest } from "next/server";
import { database } from "@utils/firebase";
import { set, ref } from "firebase/database";
import { v4 as uuiv4 } from "uuid";

export const POST = async (request: NextRequest) => {
    const { userId, prompt, tag } = await request.json();

    set(ref(database, 'prompts/' + uuiv4()), {
        creator_id: userId,
        prompt: prompt,
        tag: tag,
    })
    // .then(() => {
    //     alert("Prompt created successfully!");
    // }).catch((error) => {
    //     console.log(error);
    // })

    // try {
    //     const res = await set(ref(database, 'prompts/' + uuiv4()), {
    //         creator_id: userId,
    //         prompt: prompt,
    //         tag: tag,
    //     });
    //     console.log(res);
    //     alert("Prompt created successfully!");
    //     // .then(() => {
    //     //     alert("Prompt created successfully!");
    //     //     return new Response(JSON.stringify(prompt), { status: 200 })
    //     // })
    //     // .catch((error) => {
    //     //     console.log(error.message);
    //     //     return new Response("Prompt Not Found", { status: 404 });
    //     // })   

    //     // await newPrompt.save();
    //     // return new Response(JSON.stringify(newPrompt), { status: 201 })
    // } catch (error) {
    //     return new Response("Failed to create a new prompt", { status: 500 });
    // }
}