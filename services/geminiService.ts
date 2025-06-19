import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { StoryGenre } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

// It's crucial that API_KEY is set in the environment.
// The application will not function correctly without it.
// We'll proceed assuming it's set, and let API calls fail if it's not.
const ai = new GoogleGenAI({ apiKey: API_KEY as string });

function getSystemInstructionForGenre(genre: StoryGenre): string {
  switch (genre) {
    case StoryGenre.FANTASY:
      return "You are an expert fantasy storyteller. Craft a tale filled with magic, mythical creatures, and epic quests. Keep the tone wondrous and imaginative. Ensure the story is coherent and engaging.";
    case StoryGenre.SCI_FI:
      return "You are a science fiction author. Weave a narrative about futuristic technology, space exploration, or alien civilizations. Make it thought-provoking and scientifically plausible where appropriate. Ensure the story is coherent and engaging.";
    case StoryGenre.MYSTERY:
      return "You are a master of mystery. Create a suspenseful story with clues, red herrings, and a surprising resolution. Keep the reader guessing. Ensure the story is coherent and engaging.";
    case StoryGenre.COMEDY:
      return "You are a comedic writer. Tell a humorous story with witty dialogue, funny situations, and a lighthearted tone. Aim to make the reader laugh. Ensure the story is coherent and engaging.";
    case StoryGenre.HORROR:
      return "You are a horror novelist. Craft a chilling story designed to evoke fear and suspense. Use atmospheric descriptions and psychological tension. Ensure the story is coherent and engaging.";
    case StoryGenre.ADVENTURE:
      return "You are an adventure storyteller. Create an exciting narrative full of daring exploits, exotic locations, and thrilling challenges. Keep the pace fast and engaging. Ensure the story is coherent and engaging.";
    default:
      return "You are a helpful and creative storyteller. Ensure the story is coherent and engaging.";
  }
}

export const generateStory = async (prompt: string, genre: StoryGenre): Promise<string> => {
  if (!API_KEY) {
    console.error("API_KEY is not configured. Please set the API_KEY environment variable.");
    throw new Error("AI service is not configured. API Key is missing.");
  }

  const systemInstruction = getSystemInstructionForGenre(genre);
  // Enhance the prompt slightly to give more context to the model
  const fullPrompt = `You are a creative storyteller. Continue the following story prompt, in the genre of ${genre}. Make the continuation interesting and engaging.\n\nStory Prompt: "${prompt}"\n\nContinuation:`;


  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: fullPrompt, 
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75, 
        topP: 0.95,
        topK: 40,
      }
    });

    const storyText = response.text;
    
    if (typeof storyText !== 'string' || storyText.trim() === "") {
        console.error("Received empty or invalid story text from API:", storyText);
        throw new Error("The AI did not generate a story. Please try a different prompt or adjust the genre.");
    }
    return storyText;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = "An unknown error occurred while generating the story.";
    if (error instanceof Error) {
        if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
            errorMessage = "Invalid API Key. Please ensure your API_KEY environment variable is correctly set.";
        } else if (error.message.toLowerCase().includes("quota")) {
            errorMessage = "API request limit reached (Quota Exceeded). Please try again later.";
        } else if (error.message.includes("timed out") || error.message.includes("timeout")) {
            errorMessage = "The request to the AI service timed out. Please try again.";
        } else if (error.message.includes("fetch failed") || error.message.includes("network error")) {
             errorMessage = "Network error: Failed to connect to the AI service. Please check your internet connection.";
        } else {
            errorMessage = `Failed to generate story: ${error.message}`;
        }
    }
    throw new Error(errorMessage);
  }
};
