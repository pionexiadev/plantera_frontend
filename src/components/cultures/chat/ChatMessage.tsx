
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
  category?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copié !",
      description: "Le message a été copié dans le presse-papiers.",
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2 md:gap-3",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {message.role !== "user" && (
        <div className="flex-shrink-0">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-plantera-green/10 flex items-center justify-center">
            <Bot className="h-3 w-3 md:h-4 md:w-4 text-plantera-green" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[85%] md:max-w-[75%]",
        message.role === "user" ? "items-end" : "items-start"
      )}>
        <div className="flex items-center gap-1 md:gap-2 mb-1">
          {message.role === "user" && (
            <div className="flex-shrink-0 order-2">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-3 w-3 md:h-4 md:w-4 text-slate-600" />
              </div>
            </div>
          )}
          <span className="text-xs text-slate-500 order-1">
            {formatTime(message.timestamp)}
          </span>
          {message.category && (
            <Badge variant="secondary" className="text-xs order-3">
              {message.category}
            </Badge>
          )}
        </div>
        
        <div
          className={cn(
            "px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-sm transition-all duration-200 relative group w-full",
            message.role === "user"
              ? "bg-plantera-green text-white font-medium"
              : message.role === "assistant"
              ? "bg-slate-100 text-slate-800"
              : "bg-red-100 text-red-700 border border-red-200 text-sm font-medium"
          )}
          style={{ whiteSpace: 'pre-line' }}
        >
          <div className="text-xs md:text-sm break-words">
            {message.content}
          </div>
          {message.role === "assistant" && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 md:h-8 md:w-8"
              onClick={handleCopy}
            >
              <Copy className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
