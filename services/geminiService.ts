import { GoogleGenAI } from "@google/genai";

// CAUTION: In a production app, never expose API keys in frontend code.
// For this specific "turn-key" demo request, we assume the environment variable or user input is handled.
// Since we cannot prompt for input in a static file generation without UI, we will check if env exists.

const getApiKey = (): string | undefined => {
  // Try to get from env (if built with it) or localStorage (if user provided)
  return process.env.API_KEY || localStorage.getItem('GEMINI_API_KEY') || undefined;
};

export const generateInsight = async (noteContent: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Please set your Google Gemini API Key in the settings (or localStorage 'GEMINI_API_KEY').");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following quote/note briefly. Explain its core meaning and potential application in daily life. Keep it concise (under 100 words). \n\nQuote: "${noteContent}"`,
    });
    
    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate insight. Check API Key or quota.");
  }
};
