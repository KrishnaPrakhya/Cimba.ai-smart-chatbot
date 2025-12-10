import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database("./faqs.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err);
        return;
      }

      // Check if data already exists
      db.get("SELECT COUNT(*) as count FROM faqs", (err, row) => {
        if (err || row.count > 0) return;

        const sampleFAQs = [
          {
            question: "What are your business hours?",
            answer:
              "We are open Monday to Friday from 9:00 AM to 6:00 PM EST. Weekend support is available via email.",
            category: "General",
          },
          {
            question: "How do I reset my password?",
            answer:
              'To reset your password, click on "Forgot Password" on the login page. Enter your email address and follow the instructions sent to your inbox.',
            category: "Account",
          },
          {
            question: "What payment methods do you accept?",
            answer:
              "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
            category: "Billing",
          },
          {
            question: "How can I track my order?",
            answer:
              'Once your order ships, you will receive a tracking number via email. You can also check your order status in the "My Orders" section of your account.',
            category: "Orders",
          },
          {
            question: "What is your refund policy?",
            answer:
              "We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact our support team within 30 days for a full refund.",
            category: "Billing",
          },
          {
            question: "How do I contact customer support?",
            answer:
              "You can reach our support team via email at support@company.com, through live chat on our website, or by calling 1-800-SUPPORT during business hours.",
            category: "General",
          },
          {
            question: "Do you offer international shipping?",
            answer:
              "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for details.",
            category: "Shipping",
          },
          {
            question: "How do I update my account information?",
            answer:
              'Log into your account and navigate to "Account Settings". From there, you can update your email, password, billing address, and other details.',
            category: "Account",
          },
          {
            question: "What should I do if I receive a damaged product?",
            answer:
              "We apologize for any inconvenience. Please contact our support team immediately with photos of the damage. We will arrange a replacement or refund.",
            category: "Orders",
          },
          {
            question: "Do you have a mobile app?",
            answer:
              "Yes! Our mobile app is available for both iOS and Android. Download it from the App Store or Google Play Store.",
            category: "General",
          },
        ];

        const stmt = db.prepare(
          "INSERT INTO faqs (question, answer, category) VALUES (?, ?, ?)"
        );
        sampleFAQs.forEach((faq) => {
          stmt.run(faq.question, faq.answer, faq.category);
        });
        stmt.finalize();
        console.log("Sample FAQs inserted successfully");
      });
    }
  );
}

// Retrieval function - finds relevant FAQs
function retrieveRelevantFAQs(query, callback) {
  const keywords = query
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 3);

  if (keywords.length === 0) {
    return callback([]);
  }

  const conditions = keywords
    .map(() => "(question LIKE ? OR answer LIKE ? OR category LIKE ?)")
    .join(" OR ");
  const params = keywords.flatMap((keyword) => [
    `%${keyword}%`,
    `%${keyword}%`,
    `%${keyword}%`,
  ]);

  const sql = `SELECT * FROM faqs WHERE ${conditions} LIMIT 5`;

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Error retrieving FAQs:", err);
      return callback([]);
    }
    callback(rows);
  });
}

// Chat endpoint with RAG
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Step 1: Retrieve relevant FAQs
    retrieveRelevantFAQs(message, async (faqs) => {
      // Step 2: Construct context from retrieved FAQs
      let context = "";
      if (faqs.length > 0) {
        context = faqs
          .map(
            (faq, idx) =>
              `FAQ ${idx + 1}:\nQ: ${faq.question}\nA: ${
                faq.answer
              }\nCategory: ${faq.category}`
          )
          .join("\n\n");
      } else {
        context = "No relevant FAQs found in the knowledge base.";
      }

      // Step 3: Construct the augmented prompt
      const prompt = `You are a helpful customer support chatbot. Your answers MUST be based ONLY on the provided context. If the context does not contain the answer, politely state that you cannot find the relevant information and suggest contacting support directly.

CONTEXT:
---
${context}
---

CUSTOMER QUERY: ${message}

Please provide a helpful, friendly, and accurate response based on the context above.`;

      // Step 4: Call Gemini API
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Gemini API error:", data);
        return res.status(500).json({ error: "Failed to generate response" });
      }

      const botResponse =
        data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I could not generate a response.";

      res.json({
        response: botResponse,
        retrievedFAQs: faqs.length,
      });
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all FAQs endpoint
app.get("/api/faqs", (req, res) => {
  db.all("SELECT * FROM faqs", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch FAQs" });
    }
    res.json(rows);
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export for Vercel
export default app;
