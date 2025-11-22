import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: "Hi Alex! I'm your TRP Co-pilot. I can help you draft tenant emails, summarize financial reports, or find maintenance issues. How can I help today?",
      timestamp: new Date()
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = (query: string) => {
    const q = query.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "I'm sorry, I didn't quite catch that. Could you try asking about occupancy, maintenance, or specific tenants?";

      if (q.includes('vacant') || q.includes('occupancy')) {
        responseText = "Your portfolio is currently **95% occupied**. There are **4 vacant units** available: Unit 105 (Riverbend), Unit 2B (Maple), and two units at Pinecrest.";
      } else if (q.includes('maintenance') || q.includes('issues') || q.includes('fix')) {
        responseText = "You have **8 open maintenance issues**. The most critical is **#I-1024 (Leaking Faucet)** at Grand Central Apts. Would you like me to draft a message to the assigned contractor?";
      } else if (q.includes('email') || q.includes('draft') || q.includes('message')) {
        responseText = "I've drafted a template for you:\n\n'Dear Tenant,\n\nThis is a reminder regarding the upcoming maintenance scheduled for Tuesday. Please ensure the area is clear.\n\nBest,\nTRP Management'";
      } else if (q.includes('revenue') || q.includes('money') || q.includes('financial')) {
        responseText = "Month-to-date revenue is **$85,200**. You are currently **$3,450** behind in collected rent due to delinquencies at Oakridge and Riverbend.";
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputValue;
    setInputValue('');
    generateResponse(query);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        text: "Hi Alex! I'm your TRP Co-pilot. I can help you draft tenant emails, summarize financial reports, or find maintenance issues. How can I help today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat Window - Fixed positioning independent of button container */}
      {isOpen && (
        <div
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[500px] w-full h-full bg-white dark:bg-gray-800 rounded-none sm:rounded-2xl shadow-2xl border-t sm:border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col animate-fade-in-up z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-xl">chat</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">TRP Co-pilot</h3>
                <p className="text-xs text-blue-200 flex items-center gap-1">
                  <span className="size-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearChat();
                }}
                className="hover:bg-white/20 rounded-full p-2.5"
                title="Clear chat history"
              >
                <span className="material-symbols-outlined text-lg">delete_sweep</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="hover:bg-white/20 rounded-full p-1.5"
                title="Close"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.type === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm flex gap-1">
                  <span className="size-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="size-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="size-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-primary focus:border-primary dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-1.5 p-1 text-primary disabled:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button - Fixed positioning, only shown when chat is closed */}
      {!isOpen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 z-50 group flex items-center justify-center size-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30"
          aria-label="Open AI Assistant"
        >
          <span className="material-symbols-outlined text-2xl fill">chat</span>
        </button>
      )}
    </>
  );
};

export default AIAssistant;