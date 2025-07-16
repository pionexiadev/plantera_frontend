
import React, { useRef, useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderCircle, Bot } from "lucide-react";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatSuggestions } from "./chat/ChatSuggestions";
import { ChatInput } from "./chat/ChatInput";
import { useChatMessages } from "@/hooks/useChatMessages";
import { getAIResponse } from "@/hooks/useAIResponse";
import { toast } from "@/hooks/use-toast";

export function AIAssistantChat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, appendMessage, clearChat, exportChat } = useChatMessages();

  // Effet pour scroller automatiquement vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function handleSend(q?: string) {
    const question = typeof q === "string" ? q : input.trim();
    if (!question) return;
    appendMessage("user", question);
    setInput("");
    setLoading(true);

    try {
      const answer = await getAIResponse(question);
      appendMessage("assistant", answer);
    } catch (e: any) {
      appendMessage(
        "error",
        typeof e?.message === "string"
          ? e.message
          : "Erreur lors de la communication avec l'assistant IA."
      );
      toast({
        title: "Erreur",
        description: e.message ?? "Impossible d'obtenir une réponse pour le moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        messageCount={messages.length - 1}
        onExport={exportChat}
        onClear={clearChat}
      />

      {/* Messages */}
      <div className="flex-1 overflow-hidden mb-2 md:mb-4">
        <ScrollArea className="h-full px-1 md:px-4 py-1 md:py-4 rounded-lg border border-slate-200 bg-white">
          <div className="space-y-3 md:space-y-6 pr-1 md:pr-2">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex gap-2 md:gap-3 items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-plantera-green/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 md:h-4 md:w-4 text-plantera-green" />
                </div>
                <div className="flex gap-2 items-center text-plantera-green animate-pulse">
                  <LoaderCircle className="animate-spin h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm font-medium">L'assistant rédige une réponse…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-2 md:space-y-3">
        <ChatSuggestions
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSuggestionClick={handleSend}
          loading={loading}
        />

        <ChatInput
          input={input}
          onChange={setInput}
          onSubmit={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default AIAssistantChat;
