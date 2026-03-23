
import { GoogleGenAI } from "@google/genai";

// Standard implementation for AI Tutor using Gemini API
export const askTutor = async (question: string, context?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context || 'General Education'}\nQuestion: ${question}`,
      config: {
        systemInstruction: "You are IFTU AI, a professional tutor for the Ethiopian National Curriculum (Grade 9-12 and TVET). Your goal is to explain complex topics simply, using local examples where possible (e.g., Ethiopian history, geography, or industrial standards). Keep your tone encouraging and academic.",
        temperature: 0.7,
        topP: 0.9,
      }
    });
    // Use .text property directly as per guideline
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to the network. Please try again later. (Error: API Connection Failed)";
  }
};
