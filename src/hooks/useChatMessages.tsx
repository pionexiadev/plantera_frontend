import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
  category?: string;
}

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour 👋, je suis votre assistant agricole IA ! Posez-moi une question sur vos cultures ou cliquez sur une suggestion rapide.",
      timestamp: new Date(),
      category: "welcome"
    },
  ]);

  const appendMessage = (role: "user" | "assistant" | "error", content: string, category?: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      category
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Bonjour 👋, je suis votre assistant agricole IA ! Posez-moi une question sur vos cultures ou cliquez sur une suggestion rapide.",
      timestamp: new Date(),
      category: "welcome"
    }]);
    toast({
      title: "Conversation effacée",
      description: "L'historique de la conversation a été supprimé.",
    });
  };

  const exportChat = () => {
    const currentDate = new Date();
    const dateStr = currentDate.toISOString().split('T')[0];
    const timeStr = currentDate.toLocaleTimeString('fr-FR');
    
    // Export JSON détaillé
    const chatData = {
      exportMetadata: {
        date: dateStr,
        time: timeStr,
        totalMessages: messages.length - 1,
        categories: [...new Set(messages.filter(m => m.category && m.category !== 'welcome').map(m => m.category))],
        platform: "Assistant IA Agricole - Plantera"
      },
      conversation: messages.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString(),
        timestampFr: msg.timestamp.toLocaleString('fr-FR'),
        category: msg.category || 'general',
        wordCount: msg.content.split(' ').length
      }))
    };
    
    // Export JSON
    const jsonStr = JSON.stringify(chatData, null, 2);
    const jsonBlob = new Blob([jsonStr], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `conversation-ia-agricole-${dateStr}-${timeStr.replace(/:/g, 'h')}.json`;
    jsonLink.click();
    URL.revokeObjectURL(jsonUrl);
    
    // Export PDF-ready text
    const textContent = `🌾 RAPPORT DE CONVERSATION - ASSISTANT IA AGRICOLE
═══════════════════════════════════════════════════

📅 Date: ${currentDate.toLocaleDateString('fr-FR')}
⏰ Heure: ${timeStr}
💬 Messages: ${messages.length - 1}
🏷️ Catégories: ${[...new Set(messages.filter(m => m.category && m.category !== 'welcome').map(m => m.category))].join(', ') || 'Général'}

CONVERSATION:
═══════════════════════════════════════════════════

${messages.filter(m => m.id !== 'welcome').map(msg => {
  const role = msg.role === 'user' ? '👤 UTILISATEUR' : msg.role === 'assistant' ? '🤖 ASSISTANT IA' : '❌ ERREUR';
  const time = msg.timestamp.toLocaleTimeString('fr-FR');
  const category = msg.category ? ` [${msg.category.toUpperCase()}]` : '';
  
  return `${role}${category} (${time})
${'─'.repeat(50)}
${msg.content}

`;
}).join('')}

═══════════════════════════════════════════════════
Exporté depuis Assistant IA Agricole - Plantera
${currentDate.toLocaleString('fr-FR')}`;
    
    const textBlob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const textUrl = URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textUrl;
    textLink.download = `rapport-conversation-ia-${dateStr}.txt`;
    textLink.click();
    URL.revokeObjectURL(textUrl);
    
    toast({
      title: "Export réussi",
      description: `Conversation exportée en JSON et TXT (${messages.length - 1} messages)`,
    });
  };

  return {
    messages,
    appendMessage,
    clearChat,
    exportChat
  };
}