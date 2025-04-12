import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Check if API key is available
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API key is missing! Make sure OPENAI_API_KEY is set in your .env file');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: apiKey,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid messages format',
      });
    }

    console.log('Received messages:', messages);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log('OpenAI response received');

    res.json({
      success: true,
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get response from AI',
    });
  }
});

app.post('/api/generate-passage', async (req, res) => {
  try {
    console.log('Received request to generate passage');
    console.log('Request body:', req.body);
    
    const { difficulty } = req.body;
    
    if (!difficulty) {
      console.log('No difficulty provided');
      return res.status(400).json({
        success: false,
        error: 'Difficulty level is required',
      });
    }

    console.log('Generating passage for difficulty:', difficulty);

    const prompt = `Generate a reading passage suitable for ${difficulty} level readers. 
    The passage should be:
    1. Informative and engaging
    2. Include 3 multiple choice comprehension questions
    3. Have a clear title
    4. Be appropriate for the reading level
    5. Include a source attribution
    
    Return ONLY a valid JSON object with the following structure:
    {
      "title": "Passage Title",
      "text": "Passage content...",
      "questions": [
        {
          "id": 1,
          "text": "Question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": "Correct option"
        }
      ],
      "source": "Source attribution",
      "difficulty": "${difficulty}"
    }`;

    console.log('Sending request to OpenAI');
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates educational reading passages with comprehension questions. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    console.log('Received response from OpenAI');
    const response = JSON.parse(completion.choices[0].message.content);
    console.log('Parsed response:', response);
    
    res.json({
      success: true,
      passage: response
    });
  } catch (error) {
    console.error('Error generating passage:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate passage'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Environment variables loaded:', {
    hasApiKey: !!process.env.OPENAI_API_KEY,
  });
}); 