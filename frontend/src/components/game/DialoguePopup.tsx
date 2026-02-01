import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { api } from '../../lib/api';
import { type ChatMessage } from '../../types';

export const DialoguePopup = () => {
  const { activeItemId, eraData, sessionId, chats, addChatMessage } = useGameStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const advisor = eraData?.advisors.find(a => a.id === activeItemId);

  // Build history: always prepend the greeting, then append any existing chat messages
  const history = advisor ? [
    {
      role: 'assistant',
      content: `Greetings, Oracle. I am ${advisor.name}. What can I tell you to help you?`
    } as ChatMessage,
    ...(chats[advisor.id] || [])
  ] : [];

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history.length, isTyping]);

  if (!advisor) return null;

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    const userMsgContent = input;
    setInput(''); // Clear input immediately
    setIsTyping(true);

    // 1. Optimistic Update (Show user message immediately)
    addChatMessage(advisor.id, { role: 'user', content: userMsgContent });

    try {
      // 2. Call API
      const data = await api.chatWithAdvisor(advisor.id, userMsgContent, sessionId);

      // 3. Update with AI Response
      addChatMessage(advisor.id, { role: 'assistant', content: data.response });
    } catch (err) {
      console.error(err);
      // Optional: Add an error message to chat
    } finally {
      setIsTyping(false);
    }
  };


  const handleEndConversation = async () => {
    // Mark as consulted if not already
    const { consultAdvisor, closePopup } = useGameStore.getState();

    // Mark advisor as "Done" (Green checkmark) and close window
    consultAdvisor(advisor.id);
    closePopup();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl h-150 bg-stone-900 border border-roman-gold rounded-lg shadow-2xl flex overflow-hidden"
      >
        {/* Left: Advisor Profile */}
        <div className="w-1/3 bg-stone-950 border-r border-stone-800 p-6 flex flex-col items-center text-center relative">
          <img src={advisor.sprite} alt={advisor.name} className="w-full h-full object-cover" />
          <h3 className="text-xl font-serif text-roman-gold">{advisor.name}</h3>
          <p className="text-stone-400 text-sm mb-6">{advisor.title}</p>

          <div className="bg-stone-900 p-4 rounded border border-stone-800 w-full text-left">
            <h4 className="text-xs uppercase text-roman-red font-bold mb-2">Faction: {advisor.faction}</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Influences: {
                advisor.faction === 'senate' ? 'Republic' :
                advisor.faction === 'military' ? 'Military' :
                advisor.faction === 'merchant' ? 'Economy' :
                advisor.faction === 'family' ? 'Stability' :
                advisor.faction === 'religious' ? 'Stability' :
                'Unknown'
              }
            </p>
          </div>

          <div className="mt-auto pt-4 w-full">
            <button
              onClick={handleEndConversation}
              className="w-full py-3 border border-red-900 text-red-500 hover:bg-red-900/20 rounded transition-colors uppercase text-sm tracking-widest"
            >
              End Audience
            </button>
          </div>
          <div className="mt-2 text-xs text-stone-500">
            Messages: {(chats[advisor.id] || []).length}
          </div>
        </div>

        {/* Right: Chat Interface */}
        <div className="w-2/3 flex flex-col bg-stone-900">
          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {history.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-stone-700' : 'bg-roman-gold text-black'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                  ? 'bg-stone-800 text-stone-200 rounded-tr-none'
                  : 'bg-roman-parchment text-stone-900 rounded-tl-none'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-roman-gold flex items-center justify-center">
                  <Bot size={14} className="text-black" />
                </div>
                <div className="bg-roman-parchment p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-stone-800 bg-stone-950 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for counsel..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded px-4 py-2 text-stone-200 focus:outline-none focus:border-roman-gold"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 bg-roman-gold text-black rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};