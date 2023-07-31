import Prompt from "@models/prompt";
import { NextRequest } from "next/server";
import { database } from "@utils/firebase";
import { set, ref } from "firebase/database";

export const GET = async (request: NextRequest, { params }: { params: { id: string }}) => {
    try {
        // await connectToDB()

        // const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        // set(ref(database, 'prompts/'), {
        //     creator_id: "",
        //     prompt: "",
        //     tag: "",
        // }).then(() => {
        //     // Immediately sets a local storage of the id of the user. This enables the dashboard retrieve the details of a particular user using their id that we can now get from local storage.
        //     // window.localStorage.setItem("id", userCredential.user.uid);

        //     // The user is navigated to the dashboard once the collection in the database has been created.  
        //     alert("User created successfully!");
        //     return new Response(JSON.stringify(prompt), { status: 200 })
        // })
        // // .catch((error) => {
        // //     console.log(error.message);
        // //     return new Response("Prompt Not Found", { status: 404 });
        // // })    
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request: NextRequest, { params }: {params: { id: string }}) => {
    const { prompt, tag } = await request.json();

    try {
        // await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string }}) => {
    try {
        // await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};