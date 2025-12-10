# Smart Customer Support Chatbot

A full-stack AI-powered customer support chatbot using **Retrieval-Augmented Generation (RAG)** to provide accurate, context-aware responses.

## 🚀 Features

- **RAG Implementation**: Retrieves relevant FAQs from database before generating responses
- **Beautiful UI**: Modern, responsive design with Framer Motion animations
- **Real-time Chat**: Instant responses with typing indicators
- **Quick Questions**: Pre-defined questions for faster interaction
- **Message History**: Persistent conversation view with timestamps
- **Smart Retrieval**: Keyword-based FAQ matching for relevant context
- **Error Handling**: Graceful error messages and loading states

## 🛠️ Tech Stack

### Frontend

- React 19
- Tailwind CSS v4
- Framer Motion (animations)
- Axios (API calls)
- Lucide React (icons)
- Vite (build tool)

### Backend

- Node.js & Express.js
- SQLite3 (database)
- Gemini API (LLM)
- CORS & dotenv

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Gemini API key (free from Google AI Studio)

## 🔧 Installation

### 1. Clone and Setup

```bash
# Navigate to backend
cd backend
npm install

# Navigate to frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Get your free Gemini API key from: https://makersuite.google.com/app/apikey

### 3. Run the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📚 How RAG Works

1. **Retrieval**: When a user asks a question, the system searches the FAQ database for relevant entries using keyword matching
2. **Augmentation**: Retrieved FAQs are formatted into a context block and combined with the user's query
3. **Generation**: The augmented prompt is sent to Gemini API, which generates a grounded response based on the provided context

## 🎨 UI Features

- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Entry/exit animations for messages
- **Hover Effects**: Interactive button and message hover states
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Works on all screen sizes
- **Custom Scrollbar**: Styled scrollbar matching the theme

## 📊 Database Schema

```sql
CREATE TABLE faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT
)
```

## 🔌 API Endpoints

- `POST /api/chat` - Send a message and get AI response
- `GET /api/faqs` - Retrieve all FAQs
- `GET /api/health` - Health check

## 🎯 Sample FAQs Included

- Business hours
- Password reset
- Payment methods
- Order tracking
- Refund policy
- Customer support contact
- International shipping
- Account management
- Damaged products
- Mobile app availability

## 🚀 Future Enhancements

- Vector embeddings for better semantic search
- User authentication and session management
- Chat history persistence
- Admin panel for FAQ management
- Multi-language support
- Voice input/output
- File upload support
- Analytics dashboard

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built as part of CIMBA AI/ML Assignment
