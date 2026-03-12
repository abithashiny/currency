import { useState, useRef, useEffect } from 'react';
import { HiChat, HiX, HiPaperAirplane } from 'react-icons/hi';
import { sendChat } from '../services/api';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi! I'm your **Currency Analytics Assistant**. Ask me about exchange rates, trends, or market insights! 💱",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { from: 'user', text: msg }]);
    setLoading(true);
    try {
      const { data } = await sendChat(msg);
      setMessages((prev) => [...prev, { from: 'bot', text: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: "Sorry, I couldn't process that. Please try again." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Simple markdown bold rendering
  const renderText = (text) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          open
            ? 'bg-negative text-white rotate-0'
            : 'bg-gradient-to-br from-primary to-accent text-white pulse-glow'
        }`}
      >
        {open ? <HiX className="w-6 h-6" /> : <HiChat className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden fade-in-up border border-primary/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Currency Assistant</h3>
              <p className="text-white/70 text-[10px]">AI-powered • Always online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-bg dark:bg-bg-dark text-text dark:text-text-dark rounded-bl-md border border-border/30 dark:border-border-dark/30'
                  }`}
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-bg dark:bg-bg-dark px-4 py-3 rounded-2xl rounded-bl-md border border-border/30 dark:border-border-dark/30">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/30 dark:border-border-dark/30">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about currencies..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark disabled:opacity-40 transition-all"
              >
                <HiPaperAirplane className="w-5 h-5 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
