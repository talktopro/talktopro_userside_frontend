import { useState } from 'react';

interface IDefaultPromptsProps {
  sendMessage: (defaultPrompt?: string) => Promise<void>;
}

export function DefaultPrompts({ sendMessage }: IDefaultPromptsProps) {
  const [questions] = useState<string[]>([
    "Suggest a Python developer",
    "Can you tell me more about the refund policy?",
    "I'm new here; what's the simplest way to book a session with a mentor?",
  ]);

  return (
    <div className="flex flex-col gap-1">
      {questions.map((q, index) => (
        <span
          key={index}
          onClick={() => sendMessage(q)}
          className="p-1 px-2 border rounded-2xl text-xs w-fit bg-purple-500/10 text-purple-500 border-purple-500 cursor-pointer hover:bg-muted transition-colors duration-300"
        >
          {q}
        </span>
      ))}
    </div>
  );
}