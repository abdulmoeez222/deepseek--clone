# Gemini Chat Application

A React-based chatbot application built with Google's Gemini API. Features a modern UI inspired by DeepSeek Chat, with support for markdown rendering, code highlighting, and conversation history management.

## Features

- Clean, responsive UI with light/dark mode support
- Markdown and code syntax highlighting
- Conversation history stored in localStorage
- Mobile-friendly design
- Integration with Google's Gemini API

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- A Gemini API key from [Google AI Studio](https://ai.google.dev/)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gemini-chat.git
   cd gemini-chat
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## How to Add Your Gemini API Key

1. Create a `.env` file in the root directory
2. Add your Gemini API key in the following format:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. You can get a Gemini API key from [Google AI Studio](https://ai.google.dev/)

## Technologies Used

- React with Vite
- TailwindCSS for styling
- React Markdown for rendering markdown
- Google's Generative AI SDK for Gemini integration 