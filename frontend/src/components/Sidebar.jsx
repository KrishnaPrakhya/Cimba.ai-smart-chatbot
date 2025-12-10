import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Sidebar({ isOpen, onClose, onSelectFAQ }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (isOpen) {
      fetchFAQs();
    }
  }, [isOpen]);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`${API_URL}/faqs`);
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];
  const filteredFAQs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Knowledge Base</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-indigo-100 text-sm">
                Browse all available FAQs
              </p>
            </div>

            {/* Categories */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : (
                filteredFAQs.map((faq) => (
                  <motion.button
                    key={faq.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectFAQ(faq.question);
                      onClose();
                    }}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1 group-hover:text-indigo-600">
                          {faq.question}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {faq.answer}
                        </p>
                        <span className="inline-block mt-2 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 flex-shrink-0" />
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
