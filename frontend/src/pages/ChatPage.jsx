import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  MessageSquare,
  BookOpen,
  Trash2,
  Download,
} from "lucide-react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TypingIndicator from "../components/TypingIndicator";

const API_URL = "http://localhost:5000/api";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 I'm your AI customer support assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: input,
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.data.response,
        timestamp: new Date(),
        retrievedFAQs: response.data.retrievedFAQs,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const quickQuestions = [
    "What are your business hours?",
    "How do I reset my password?",
    "What payment methods do you accept?",
    "How can I track my order?",
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Hello! 👋 I'm your AI customer support assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  const exportChat = () => {
    const chatText = messages
      .map(
        (msg) =>
          `[${msg.timestamp.toLocaleString()}] ${msg.sender.toUpperCase()}: ${
            msg.text
          }`
      )
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-export-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <div>
              <h2 className="font-bold">AI Assistant</h2>
              <p className="text-xs text-indigo-100">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Browse FAQs"
            >
              <BookOpen className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={exportChat}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Export Chat"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={clearChat}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-linear-to-br from-indigo-500 to-purple-500"
                      : "bg-linear-to-br from-emerald-400 to-cyan-400"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.sender === "user"
                      ? "bg-linear-to-br from-indigo-500 to-purple-500 text-white"
                      : message.isError
                      ? "bg-red-50 text-red-900 border border-red-200"
                      : "bg-gray-50 text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                    <span>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.retrievedFAQs > 0 && (
                      <span className="flex items-center gap-1">
                        • <MessageSquare className="w-3 h-3" />{" "}
                        {message.retrievedFAQs} FAQs
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 pb-4"
          >
            <p className="text-sm text-gray-600 mb-3 font-medium">
              Quick questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full text-sm transition-colors border border-indigo-200"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="p-6 bg-gray-50 border-t border-gray-200"
        >
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectFAQ={handleQuickQuestion}
      />
    </div>
  );
}
