
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';
  
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isBot ? "bg-secondary/50" : "bg-background"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        isBot ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className="flex-1">
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
