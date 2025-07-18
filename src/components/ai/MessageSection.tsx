import { IChatbotMessage } from "@/types/user"
import { RefObject } from "react";
import { DefaultPrompts } from "./DefaultPrompts";
import { Wand } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IMessageSectionProps {
  messages: IChatbotMessage[];
  bottomRef: RefObject<HTMLDivElement | null>
  sendMessage: (defaultPrompt?: string) => Promise<void>
  isGenerating: boolean;
};

export function MessageSection({ messages, bottomRef, sendMessage, isGenerating }: IMessageSectionProps) {
  return (
    <div className="py-3 gap-2 h-full overflow-y-scroll custom-scrollbar flex flex-col">
      {messages.length === 0 ? (
        <div className="mt-auto">
          <DefaultPrompts sendMessage={sendMessage} />
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-2 rounded-2xl max-w-[85%] overflow-hidden overflow-x-auto custom-scrollbar text-sm ${message.isUser
                  ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-br-none"
                  : "bg-muted-foreground/10 border rounded-bl-none"
                  }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                    em: ({ ...props }) => <em className="italic" {...props} />,
                    a: ({ ...props }) => (
                      <a
                        className={`${message.isUser ? 'text-background underline' : 'text-blue-500 underline hover:text-blue-700'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                    table: ({ ...props }) => (
                      <table className="w-full border-collapse rounded-xl" {...props} />
                    ),
                    thead: ({ ...props }) => <thead className="bg-muted/50 rounded-xl" {...props} />,
                    tbody: ({ ...props }) => <tbody {...props} className="" />,
                    tr: ({ ...props }) => <tr className="" {...props} />,
                    th: ({ ...props }) => (
                      <th className="text-left p-2 border-b border-muted-foreground font-semibold bg-background px-4 whitespace-nowrap" {...props} />
                    ),
                    td: ({ ...props }) => <td className="p-2 border-b border-muted-foreground/50 whitespace-nowrap px-4" {...props} />,
                  }}
                >
                  {message.text}
                </ReactMarkdown>

              </div>
            </div>
          ))}
          {isGenerating && (
            <span className="flex gap-1 text-xs animate-pulse">
              <Wand size={16} />
              <span className="generating-dots">Thinking</span>
            </span>
          )}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
};