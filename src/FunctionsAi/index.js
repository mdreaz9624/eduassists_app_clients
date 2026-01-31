// // FunctionsAi/index.js
// const { onCall } = require("firebase-functions/v2/https"); // Use v2 for modern projects
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const geminiAi = {
//   GEMINI_API_KEY : import.meta.env.GEMINI_API_KEY
// }

// // Directly use the key or ensure it's in FunctionsAi/.env
// const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

// exports.eduasistaChat = onCall({ cors: true }, async (request) => {
//   // In v2, the message is inside request.data
//   const message = request.data.message;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
//     const systemPrompt = "You are Eduasista, the official AI assistant for EduAssists. You help students with admissions, franchise partners with queries, and provide study abroad guidance. Be polite and professional.";
    
//     const prompt = `${systemPrompt}\n\nUser: ${message}`;
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
    
//     return { text: response.text() };
//   } catch (error) {
//     console.error("AI Error:", error);
//     return { text: "Eduasista is currently resting. Please try again later!" };
//   }
// });