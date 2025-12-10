import { motion } from "framer-motion";
import { Bot, Zap, Shield, Target, Users, Award } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "RAG Technology",
      description:
        "Retrieval-Augmented Generation ensures accurate, grounded responses from our knowledge base.",
    },
    {
      icon: Shield,
      title: "No Hallucination",
      description:
        "Our AI only provides information from verified sources, preventing false information.",
    },
    {
      icon: Target,
      title: "Context-Aware",
      description:
        "Understands your questions in context and provides relevant, helpful answers.",
    },
    {
      icon: Users,
      title: "User-Friendly",
      description:
        "Beautiful, intuitive interface designed for seamless user experience.",
    },
  ];

  const techStack = [
    { name: "React 19", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Framer Motion", category: "Animations" },
    { name: "Node.js & Express", category: "Backend" },
    { name: "SQLite", category: "Database" },
    { name: "Gemini API", category: "AI/ML" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Bot className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Our
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Smart Chatbot
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A cutting-edge AI-powered customer support solution built with
            modern technologies and best practices
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We're on a mission to revolutionize customer support through
            intelligent automation. Our chatbot leverages Retrieval-Augmented
            Generation (RAG) technology to provide accurate, contextual
            responses while maintaining the warmth and understanding of human
            interaction.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            By combining advanced AI with a carefully curated knowledge base, we
            ensure that every interaction is meaningful, helpful, and grounded
            in verified information.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="w-12 h-12 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Built With Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="font-bold text-lg mb-1">{tech.name}</div>
                <div className="text-sm text-indigo-100">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "10+", label: "FAQs" },
            { value: "<3s", label: "Response Time" },
            { value: "100%", label: "Accuracy" },
            { value: "24/7", label: "Available" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
