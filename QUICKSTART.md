# 🚀 Quick Start Guide

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Configure Backend

1. Open `backend/.env` file
2. Add your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   ```

## Step 3: Start Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

You should see:

```
Server running on http://localhost:5000
Connected to SQLite database
Sample FAQs inserted successfully
```

## Step 4: Start Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm run dev
```

You should see:

```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Step 5: Open the Application

Open your browser and navigate to: **http://localhost:5173**

## 🎉 You're Ready!

Try asking questions like:

- "What are your business hours?"
- "How do I reset my password?"
- "What payment methods do you accept?"

## 🎨 Features to Explore

1. **Quick Questions** - Click on pre-defined questions below the chat
2. **Browse FAQs** - Click the book icon in the header to see all FAQs
3. **Export Chat** - Click the download icon to save your conversation
4. **Clear Chat** - Click the trash icon to start fresh
5. **Smooth Animations** - Watch the beautiful transitions!

## 🔧 Troubleshooting

### Backend won't start

- Make sure you're in the `backend` directory
- Check that `.env` file exists with your API key
- Run `npm install` if packages are missing

### Frontend won't start

- Make sure you're in the `frontend` directory
- Run `npm install` if packages are missing
- Check that backend is running on port 5000

### API errors

- Verify your Gemini API key is correct
- Check your internet connection
- Make sure the API key has no extra spaces

### Database issues

- Delete `backend/faqs.db` and restart the server
- The database will be recreated automatically

## 📝 Testing RAG

To see RAG in action:

1. Ask: "What are your hours?"

   - The system retrieves the "business hours" FAQ
   - Gemini generates a response based on that context
   - You'll see "1 FAQs" indicator showing retrieval worked

2. Ask something not in the FAQs: "What's the weather?"
   - The system won't find relevant FAQs
   - Gemini will politely say it can't help with that

## 🎯 Next Steps

- Add more FAQs to the database
- Customize the UI colors and styling
- Implement user authentication
- Add conversation history persistence
- Deploy to production!

Enjoy your Smart Customer Support Chatbot! 🤖✨
