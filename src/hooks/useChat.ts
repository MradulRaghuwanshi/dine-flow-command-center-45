
import { useState } from 'react';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      addMessage(content, 'user');

      // Here we'll use a basic response for now
      // In a real application, you would connect this to an AI service
      const response = await simulateAIResponse(content);
      addMessage(response, 'assistant');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate AI response - replace this with actual AI integration
  const simulateAIResponse = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const responses = {
      help: "I can help you navigate the system. You can manage orders, view analytics, and handle menu items. What would you like to know more about?",
      menu: "To manage your menu, go to the Menu Management page. There you can add, edit, or remove items and categories.",
      order: "Orders can be managed from the Orders page. You can view, filter, and update order statuses there.",
      default: "I'm here to help you use the system. You can ask about orders, menu management, or general navigation.",
    };

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('help')) return responses.help;
    if (lowerMessage.includes('menu')) return responses.menu;
    if (lowerMessage.includes('order')) return responses.order;
    return responses.default;
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
