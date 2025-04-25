
import { useState, useRef, useEffect } from "react";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "./ChatMessage";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  // Add welcome message when opened if no messages
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        sendMessage("Welcome to DineFlow");
      }, 300);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[380px] h-[500px] flex flex-col shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">DineFlow Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 p-4">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="flex flex-col gap-2 pb-2">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
                    <Bot className="h-8 w-8 mb-4" />
                    <p>Hi! I'm your DineFlow assistant.</p>
                    <p>How can I help you today?</p>
                  </div>
                ) : (
                  messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                  ))
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex gap-2 mt-auto">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={handleOpen}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
