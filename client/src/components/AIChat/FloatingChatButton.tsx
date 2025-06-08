import { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIChat } from './AIChat';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useTranslations();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative flex items-center justify-center w-11 h-11",
            "bg-gradient-to-r from-primary/90 to-blue-500/90",
            "hover:from-primary hover:to-blue-500",
            "text-primary-foreground shadow-lg",
            "rounded-xl border border-white/10",
            "transition-[border-radius,transform,shadow] duration-300",
            "hover:rounded-2xl hover:scale-110 hover:shadow-xl",
            "active:scale-90",
            "before:absolute before:inset-0",
            "before:bg-gradient-to-r before:from-primary/20 before:to-blue-500/20",
            "before:rounded-xl before:hover:rounded-2xl before:transition-[border-radius,opacity]",
            "before:opacity-0 hover:before:opacity-100",
            "before:animate-pulse"
          )}
          aria-label={
            language === 'ru'
              ? 'Открыть AI ассистента'
              : language === 'kz'
              ? 'AI көмекшісін ашу'
              : 'Open AI Assistant'
          }
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Bot className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 dark:bg-gray-950/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300
                }
              }}
              exit={{ 
                opacity: 0, 
                y: 20, 
                scale: 0.95,
                transition: { duration: 0.2 }
              }}
              className={cn(
                "fixed bottom-[88px] right-6 w-full max-w-[400px] h-[600px] z-50",
                "overflow-hidden rounded-2xl shadow-2xl",
                "bg-gradient-to-b from-background/95 to-background/50",
                "dark:from-gray-900/95 dark:to-gray-900/50",
                "border border-white/10 dark:border-white/5",
                "backdrop-blur-xl"
              )}
            >
              <AIChat />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 