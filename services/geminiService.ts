// @google/genai 未安装，此功能暂时禁用
// 如需启用，请先运行: npm install @google/genai

// import { GoogleGenAI } from "@google/genai";

// CAUTION: In a production app, never expose API keys in frontend code.
// For this specific "turn-key" demo request, we assume the environment variable or user input is handled.
// Since we cannot prompt for input in a static file generation without UI, we will check if env exists.

const getApiKey = (): string | undefined => {
  // Try to get from env (if built with it) or localStorage (if user provided)
  if (typeof process !== 'undefined' && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('GEMINI_API_KEY') || undefined;
  }
  return undefined;
};

export const generateInsight = async (_noteContent: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Please set your Google Gemini API Key in the settings (or localStorage 'GEMINI_API_KEY').");
  }

  // TODO: 重新启用此功能需要安装 @google/genai
  // const ai = new GoogleGenAI({ apiKey });
  // const response = await ai.models.generateContent({
  //   model: 'gemini-2.5-flash',
  //   contents: `Analyze the following quote/note briefly...`,
  // });
  // return response.text || "No insight generated.";

  throw new Error("AI insight feature is not available. Please install @google/genai package.");
};
