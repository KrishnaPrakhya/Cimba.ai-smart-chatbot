# 📁 Project Structure

```
smart-chatbot/
├── backend/
│   ├── node_modules/
│   ├── .env                    # Environment variables (API keys)
│   ├── faqs.db                 # SQLite database (auto-generated)
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server with RAG implementation
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── Sidebar.jsx         # FAQ browser sidebar
│   │   │   └── TypingIndicator.jsx # Animated typing dots
│   │   ├── App.css             # Custom styles & scrollbar
│   │   ├── App.jsx             # Main chat application
│   │   ├── index.css           # Tailwind imports
│   │   └── main.jsx            # React entry point
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json            # Frontend dependencies
│   ├── postcss.config.js       # PostCSS configuration
│   ├── README.md
│   └── vite.config.js          # Vite configuration
│
├── QUICKSTART.md               # Quick start guide
├── PROJECT_STRUCTURE.md        # This file
└── README.md                   # Main documentation
```

## 🔑 Key Files Explained

### Backend

**server.js** (Main Backend Logic)

- Express server setup
- SQLite database initialization
- 10 sample FAQs pre-loaded
- RAG implementation:
  - `retrieveRelevantFAQs()` - Keyword-based FAQ search
  - `/api/chat` - Main chat endpoint with RAG
  - `/api/faqs` - Get all FAQs
  - `/api/health` - Health check

**.env** (Configuration)

```env
GEMINI_API_KEY=your_key_here
PORT=5000
```

### Frontend

**App.jsx** (Main Component)

- Chat interface with message history
- User input handling
- API communication
- Quick questions feature
- Export/clear chat functionality
- Sidebar integration

**Sidebar.jsx** (FAQ Browser)

- Displays all FAQs from database
- Category filtering
- Click to auto-fill questions
- Smooth slide-in animation

**TypingIndicator.jsx** (Loading Animation)

- Animated dots while bot is thinking
- Framer Motion powered

**index.css** (Tailwind Setup)

```css
@import "tailwindcss";
```

**App.css** (Custom Styles)

- Custom scrollbar styling
- Smooth animations

## 📦 Dependencies

### Backend

- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `sqlite3` - Database
- `dotenv` - Environment variables

### Frontend

- `react` - UI library
- `framer-motion` - Animations
- `axios` - HTTP client
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `vite` - Build tool

## 🔄 Data Flow

1. **User Input** → Frontend captures message
2. **API Call** → POST to `/api/chat` with message
3. **Retrieval** → Backend searches FAQs for relevant context
4. **Augmentation** → Combines FAQs + query into prompt
5. **Generation** → Sends to Gemini API
6. **Response** → Returns AI response to frontend
7. **Display** → Shows message with animation

## 🎨 UI Components

### Chat Message

- User messages: Purple gradient, right-aligned
- Bot messages: Gray background, left-aligned
- Timestamps on all messages
- FAQ count indicator on bot messages

### Header

- Rotating sparkle icon
- Browse FAQs button
- Export chat button
- Clear chat button

### Input Area

- Text input with focus ring
- Send button with gradient
- Disabled state during loading

### Sidebar

- Category filters
- Searchable FAQ list
- Click to use question
- Smooth animations

## 🗄️ Database Schema

```sql
CREATE TABLE faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT
)
```

**Sample Categories:**

- General
- Account
- Billing
- Orders
- Shipping

## 🎯 RAG Implementation Details

### 1. Retrieval

```javascript
// Extracts keywords from query
const keywords = query.toLowerCase().split(' ').filter(word => word.length > 3);

// Searches database
SELECT * FROM faqs
WHERE question LIKE '%keyword%'
   OR answer LIKE '%keyword%'
   OR category LIKE '%keyword%'
LIMIT 5
```

### 2. Augmentation

```javascript
const prompt = `
You are a helpful customer support chatbot. 
Your answers MUST be based ONLY on the provided context.

CONTEXT:
---
${retrievedFAQs}
---

CUSTOMER QUERY: ${userQuery}
`;
```

### 3. Generation

```javascript
// Calls Gemini API
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent

// Returns grounded response
```

## 🚀 Performance Features

- **Lazy Loading**: Sidebar FAQs load only when opened
- **Optimistic UI**: Messages appear instantly
- **Error Handling**: Graceful fallbacks
- **Auto-scroll**: Always shows latest message
- **Debouncing**: Prevents spam submissions

## 🎨 Animation Features

- **Entry Animations**: Messages fade and slide in
- **Hover Effects**: Buttons and messages scale
- **Loading States**: Typing indicator with bouncing dots
- **Sidebar**: Smooth slide-in from right
- **Backdrop**: Fade-in overlay

## 🔐 Security Considerations

- API key stored in `.env` (not committed)
- CORS enabled for local development
- Input validation on backend
- SQL injection prevention (parameterized queries)
- Error messages don't expose internals

## 📈 Future Enhancements

- [ ] Vector embeddings for semantic search
- [ ] User authentication
- [ ] Conversation persistence
- [ ] Admin panel for FAQ management
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] File attachments
- [ ] Analytics dashboard
- [ ] Rate limiting
- [ ] Caching layer

## 🧪 Testing the RAG

**Test 1: Exact Match**

- Query: "What are your business hours?"
- Expected: Retrieves business hours FAQ
- Response: Accurate answer from context

**Test 2: Partial Match**

- Query: "How do I change my password?"
- Expected: Retrieves password reset FAQ
- Response: Contextual answer

**Test 3: No Match**

- Query: "What's the weather today?"
- Expected: No FAQs retrieved
- Response: Polite "can't help with that"

**Test 4: Multiple Matches**

- Query: "payment"
- Expected: Retrieves payment methods + refund policy
- Response: Comprehensive answer using both FAQs
