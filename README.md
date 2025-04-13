# LiterAI - Interactive Literacy Learning Platform

LiterAI is an AI-powered literacy learning platform designed for K-12 students. It combines engaging animations, interactive exercises, and artificial intelligence to make learning to read and write fun and effective.

## Features

- 🎯 AI-Powered Story Generation
- 🎮 Interactive Learning Exercises
- 📊 Progress Tracking
- 🎤 Voice Recognition
- 🎨 Beautiful Animations
- 📱 Responsive Design

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- @react-spectrum
- React Confetti

## Getting Started

1. Clone the repository (run "git clone https://github.com/oli-ht/literai.git" in terminal)
2. Open folder in code editor
3. Install dependencies in terminal:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser

6. Fill in env. variables if you have them (enables chatbot and reading comprehension generation)
  - GEMINI, OPENAI, HUGGINGFACE

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Main application pages
  ├── hooks/         # Custom React hooks
  ├── assets/        # Images, fonts, etc.
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 
