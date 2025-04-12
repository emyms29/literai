import { NextApiRequest, NextApiResponse } from 'next';
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Initialize the Vision API client
const vision = new ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, targetWord } = req.body;

    if (!image || !targetWord) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');

    // Perform label detection
    const [result] = await vision.labelDetection({
      image: { content: imageBuffer },
    });

    const labels = result.labelAnnotations || [];
    
    // Check if any of the detected labels match the target word
    // We use a fuzzy match to account for variations in how people might draw things
    const isValid = labels.some(label => {
      const labelText = label.description?.toLowerCase() || '';
      return labelText.includes(targetWord) || targetWord.includes(labelText);
    });

    return res.status(200).json({ isValid });
  } catch (error) {
    console.error('Error processing image:', error);
    return res.status(500).json({ error: 'Error processing image' });
  }
} 