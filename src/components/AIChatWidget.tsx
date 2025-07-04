"use client";

import React, { useState, createContext, useContext } from 'react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatWidget = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatWidget must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};

const AIChatWidget: React.FC = () => {
  const { isOpen, openChat, closeChat } = useChatWidget();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage: Message = { id: Date.now(), text: inputMessage, isBot: false };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      
      const userInput = inputMessage;
      setInputMessage('');

      try {
        // Send conversation history for context-aware responses
        const conversationHistory = updatedMessages.map(msg => ({
          role: msg.isBot ? 'assistant' : 'user',
          content: msg.text
        }));

        // Call the recommendation API with conversation history
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            query: userInput,
            conversationHistory: conversationHistory 
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Each line is a separate message
          const botMessages: Message[] = (data.suggestions || []).map((line: string, idx: number) => ({
            id: Date.now() + idx + 1,
            text: line,
            isBot: true
          }));
          setMessages(prev => [...prev, ...botMessages]);
        } else {
          throw new Error('Failed to get recommendations');
        }
      } catch (error) {
        console.error('Error getting recommendations:', error);
        const errorResponse: Message = {
          id: Date.now() + 1,
          text: "I apologize, but I'm experiencing some technical difficulties at the moment. However, I'd be delighted to guide you through our exquisite restaurant collection! We feature authentic Italian, refined Japanese, vibrant Indian, traditional Mexican, and many other world-class cuisines.",
          isBot: true
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={openChat}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 group bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white p-3 md:p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 z-40 transform hover:scale-105"
      >
        {isOpen ? (
          <svg className="w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 lucide lucide-bot-icon lucide-bot">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-4 md:bottom-28 md:right-8 md:inset-auto md:w-96 md:h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-40 overflow-hidden transform animate-in slide-in-from-bottom-4 duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5 lucide lucide-bot-icon lucide-bot">
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-sm md:text-base">Culinary Concierge</span>
                <div className="text-white/70 text-xs md:text-sm font-light">AI Assistant</div>
              </div>
            </div>
            <button 
              onClick={closeChat}
              className="text-white/70 hover:text-white transition-colors duration-300 p-1 md:p-2 rounded-lg hover:bg-white/10 touch-target"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-gradient-to-br from-slate-50 to-white">
            {messages.length === 0 && (
              <div className="text-center mt-8 md:mt-16">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.773-4.227L6.182 6.182M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-slate-900 mb-2 md:mb-3">Ready to Discover?</h3>
                <p className="text-slate-600 font-light text-sm md:text-base">Share your cravings and let me recommend the perfect dining experience!</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl shadow-sm ${
                  message.isBot 
                    ? 'bg-white text-slate-800 border border-slate-100' 
                    : 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white'
                }`}>
                  <p className="text-sm md:text-sm leading-relaxed font-light whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 border border-slate-100 p-3 md:p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-slate-600 font-light">Curating recommendations...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-slate-100 bg-white">
            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask for recommendations..."
                className="flex-1 px-4 py-3 md:px-4 md:py-3 text-sm md:text-base bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white px-4 py-3 md:px-5 md:py-3 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 touch-target"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
