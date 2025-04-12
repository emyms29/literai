import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export const handleChat = async (messages: any[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      success: true,
      response: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      error: 'Failed to get response from AI',
    };
  }
}; 