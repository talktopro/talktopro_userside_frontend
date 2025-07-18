import { Search, SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IChatbotMessage } from "@/types/user";
import { MessageSection } from "./MessageSection";
import apiClient from "@/api/axiosInstance";
import useErrorHandler from "@/hooks/useErrorHandler";
import axios from "axios";
import { Textarea } from "../ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<IChatbotMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [popoverError, setPopoverError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const { handleError } = useErrorHandler();
  const { user } = useSelector(selectAuth);

  const sendMessage = async (defaultPrompt: string = "") => {
    try {
      const message = defaultPrompt.length ? defaultPrompt : userInput.trim();
      if (!message.length) return;

      setIsGenerating(true);
      setMessages((prev) => ([...prev, { text: message, isUser: true }]));
      setUserInput("");
      setPopoverError(null);

      const { data } = await apiClient.get<{ message: string }>('/ai/chat', {
        params: { message: message }
      });
      setMessages((prev) => ([...prev, { text: data.message, isUser: false }]))

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if ([429, 503, 500].includes(error.response.status)) {
          setPopoverError(error.response.data?.message || "An unexpected error occurred.");
        } else {
          handleError(error, error.response.data?.message || "An unexpected error occurred.");
        }
      } else {
        handleError("An unexpected error occurred.");
      }
    } finally {
      inputRef.current?.focus();
      setIsGenerating(false);
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isGenerating) {
        sendMessage();
      }
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (popoverError) {
      const timer = setTimeout(() => {
        setPopoverError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [popoverError]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="fixed flex justify-center items-center bg-gradient-to-r from-purple-500 to-purple-700 right-4 md:bottom-8 md:right-8 h-13 min-w-13 w-auto z-40 cursor-pointer rounded-full px-3">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5 block leading-none text-white" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="flex items-center space-x-2 px-2">
                  <span className="text-white text-sm font-semibold">Ask AI</span>
                  <RiRobot2Fill size={20} fill="white" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="relative w-[22rem] sm:w-md md:w-lg lg:w-xl sm:max-w-md md:max-w-lg lg:max-w-xl h-[70dvh] p-4 shadow-2xl border bg-background rounded-2xl overflow-hidden flex flex-col"
        align="end"
        side="top"
      >
        <AnimatePresence>
          {popoverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-fit max-w-[90%] p-3 bg-red-100 dark:bg-red-950 border border-red-700 dark:border-red-400 text-red-700 dark:text-red-400 rounded-lg text-sm shadow-lg"
            >
              {popoverError}
            </motion.div>
          )}
        </AnimatePresence>

        {user ? (
          <MessageSection
            messages={messages}
            bottomRef={bottomRef}
            sendMessage={sendMessage}
            isGenerating={isGenerating}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <RiRobot2Fill size={35} fill="#9810fa" />
            <p className="text-sm md:text-lg font-medium">Unlock our AI assistant</p>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Please login to start using the chatbot.</p>
            <a
              href="/login"
              className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
            >
              Login
            </a>
          </div>
        )}

        <div className="w-full mt-4">
          <div className="relative flex items-center bg-muted border border-muted-foreground/40 rounded-3xl ps-3 sm:ps-4 pe-1 py-1 sm:py-1.5">
            <Search className="h-5 w-5 text-muted-foreground mr-2 sm:mr-3" />
            <Textarea
              placeholder={user ? "Ask your question?" : "Please login to use AI assistant"}
              autoFocus
              ref={inputRef}
              readOnly={isGenerating || !user}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={userInput}
              className="flex-1 resize-none border-none bg-transparent outline-0 focus:border-none shadow-none text-sm text-accent-foreground placeholder-muted-foreground px-0 py-2 min-h-10 max-h-32 custom-scrollbar"
            />
            <div className="w-9 h-9 flex justify-center items-center ml-2 sm:ml-3 mr-1">
              {!isGenerating ? (
                <button
                  onClick={() => sendMessage()}
                  disabled={isGenerating || !user || !userInput.trim().length}
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <SendHorizontal className="h-4 w-4" />
                </button>
              ) : (
                <span className="relative flex size-5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex size-5 rounded-full bg-purple-500"></span>
                </span>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
};