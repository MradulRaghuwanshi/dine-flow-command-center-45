
import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage if available
    const savedMessages = localStorage.getItem('chat_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = useCallback((content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('chat_messages');
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    try {
      setIsLoading(true);
      addMessage(content, 'user');

      // Simulate response delay for more natural feel
      const response = await simulateAIResponse(content);
      addMessage(response, 'assistant');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, toast]);

  // Enhanced AI response simulation with more context-aware responses
  const simulateAIResponse = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMessage = message.toLowerCase();
    
    // Welcome message handling
    if (lowerMessage === "welcome to dineflow") {
      return "Welcome! I'm your DineFlow assistant. I can help you manage your restaurant operations, including orders, menu items, and analytics. What would you like assistance with today?";
    }
    
    // More comprehensive response mapping
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your DineFlow assistant. How can I help you today?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! Feel free to chat again if you need any assistance.";
    }

    const responses = {
      help: "I can help you navigate the system. You can manage orders, view analytics, handle menu items, and configure settings. What would you like to know more about?",
      menu: "To manage your menu, go to the Menu Management page. There you can add, edit, or remove items and categories. You can also upload images for your menu items and organize them by categories.",
      order: "Orders can be managed from the Orders page. You can view, filter, and update order statuses there. The system allows you to track order progress and manage customer information.",
      payment: "Payment settings can be configured in the Settings page. You can set up payment methods, taxes, and discounts for your restaurant.",
      analytics: "The Analytics page provides insights into your restaurant performance. You can view sales data, popular items, and customer statistics.",
      settings: "In the Settings page, you can configure your restaurant profile, payment options, offers management, and system preferences.",
      dashboard: "The Dashboard provides an overview of your restaurant's performance. You can see recent orders, sales statistics, and quick access to common actions.",
      category: "Categories help organize your menu items. You can create, edit, and delete categories in the Menu Management page.",
      staff: "You can manage your restaurant staff from the Settings page. Add staff members and assign roles with specific permissions.",
      customer: "Customer information is collected during the ordering process. You can view customer details in the Orders section.",
      default: "I'm here to help you use the DineFlow restaurant management system. You can ask about orders, menu management, analytics, settings, or general navigation. How can I assist you today?",
    };

    if (lowerMessage.includes('help')) return responses.help;
    if (lowerMessage.includes('menu')) return responses.menu;
    if (lowerMessage.includes('order')) return responses.order;
    if (lowerMessage.includes('payment')) return responses.payment;
    if (lowerMessage.includes('analytic')) return responses.analytics;
    if (lowerMessage.includes('setting')) return responses.settings;
    if (lowerMessage.includes('dashboard')) return responses.dashboard;
    if (lowerMessage.includes('category')) return responses.category;
    if (lowerMessage.includes('staff')) return responses.staff;
    if (lowerMessage.includes('customer')) return responses.customer;

    return responses.default;
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};
