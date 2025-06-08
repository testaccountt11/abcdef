import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { AIService } from '@/services/ai.service';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

const MAX_UNAUTHORIZED_MESSAGES = 3;

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useTranslations();
  const { user } = useAuthContext();
  const [, setLocation] = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showLoginPrompt]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    if (!user && messageCount >= MAX_UNAUTHORIZED_MESSAGES) {
      setShowLoginPrompt(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    if (!user) {
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      if (newCount >= MAX_UNAUTHORIZED_MESSAGES) {
        setShowLoginPrompt(true);
      }
    }

    try {
      const response = await AIService.sendMessage(input);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Извините, произошла ошибка. Попробуйте позже.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLogin = () => {
    setLocation('/login');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          {language === 'ru' 
            ? 'AI Ассистент' 
            : language === 'kz' 
            ? 'AI көмекшісі' 
            : 'AI Assistant'}
        </h2>
        {!user && (
          <p className="text-sm text-muted-foreground/80 mt-1">
            {language === 'ru'
              ? `Осталось бесплатных сообщений: ${MAX_UNAUTHORIZED_MESSAGES - messageCount}`
              : language === 'kz'
              ? `Қалған тегін хабарламалар: ${MAX_UNAUTHORIZED_MESSAGES - messageCount}`
              : `Free messages remaining: ${MAX_UNAUTHORIZED_MESSAGES - messageCount}`}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={cn(
                'shrink-0 select-none',
                message.type === 'user' 
                  ? 'w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center' 
                  : 'w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-blue-500/5 flex items-center justify-center'
              )}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className={cn(
                'px-4 py-2.5 rounded-2xl shadow-sm',
                message.type === 'user'
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary-foreground rounded-tr-sm'
                  : 'bg-blue-500/10 dark:bg-blue-500/20 text-foreground rounded-tl-sm'
              )}>
                <p className="text-[15px] leading-relaxed">{message.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
        
        {showLoginPrompt && !user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl p-4 text-center max-w-[85%]">
              <p className="text-[15px] mb-3">
                {language === 'ru'
                  ? 'Вы достигли лимита бесплатных сообщений. Войдите, чтобы продолжить общение без ограничений.'
                  : language === 'kz'
                  ? 'Сіз тегін хабарламалар шегіне жеттіңіз. Шексіз әңгімелесуді жалғастыру үшін жүйеге кіріңіз.'
                  : 'You have reached the free message limit. Sign in to continue chatting without limits.'}
              </p>
              <Button 
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {language === 'ru' 
                  ? 'Войти' 
                  : language === 'kz'
                  ? 'Кіру'
                  : 'Sign In'}
              </Button>
            </div>
          </motion.div>
        )}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="shrink-0 select-none w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-blue-500/5 flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-500" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl shadow-sm bg-blue-500/10 dark:bg-blue-500/20 rounded-tl-sm">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-[15px] text-muted-foreground/80">
                    {language === 'ru'
                      ? 'Печатает...'
                      : language === 'kz'
                      ? 'Жазып жатыр...'
                      : 'Typing...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === 'ru'
                ? 'Напишите сообщение...'
                : language === 'kz'
                ? 'Хабарлама жазыңыз...'
                : 'Type a message...'
            }
            className={cn(
              'w-full resize-none rounded-xl pr-12 min-h-[44px] max-h-36',
              'bg-white/5 dark:bg-white/2 border border-white/10',
              'placeholder:text-muted-foreground/50',
              'text-[15px] leading-relaxed px-4 py-3',
              'focus:outline-none focus:ring-2 focus:ring-primary/20'
            )}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping || (!user && messageCount >= MAX_UNAUTHORIZED_MESSAGES)}
            className={cn(
              'absolute right-1 p-2 rounded-lg transition-all duration-200',
              'hover:bg-white/5 active:bg-white/10',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              input.trim() && !isTyping && 'text-primary',
              !input.trim() || isTyping ? 'text-muted-foreground/50' : 'text-primary'
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 