
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';
  
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-md mb-2",
      isBot ? "bg-secondary/50" : "bg-background border border-border/50"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isBot ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className="flex-1">
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {format(new Date(message.timestamp), 'HH:mm')}
        </p>
      </div>
    </div>
  );
}
