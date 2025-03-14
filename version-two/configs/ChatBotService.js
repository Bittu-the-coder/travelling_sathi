import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use .env for security
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// System prompt for multi-domain chatbot
const systemPrompt = `
You are a friendly and knowledgeable assistant for this travel app.  
You can answer questions about:
- **Trip planning**
- **Best travel destinations**
- **Budget-friendly travel tips**
- **Weather & packing suggestions**
- **Local culture & places to visit**  

Format responses using **Markdown-like syntax**:  
- Use **bold** for important terms.  
- Use \`code\` for short tips.  
- Use - for bullet points.  
- Use \n for new lines.  
- Include emojis when relevant.  
`;

// Function to get AI response
export const getAIResponse = async (userInput) => {
  try {
    const prompt = `${systemPrompt}\nUser: ${userInput}\nBot:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response;
  } catch (error) {
    console.error("Error:", error);
    return "❌ *Sorry, I couldn't process that request.*";
  }
};
