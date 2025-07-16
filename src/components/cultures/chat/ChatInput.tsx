
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  input: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function ChatInput({ input, onChange, onSubmit, loading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="flex gap-1 md:gap-2" onSubmit={handleFormSubmit}>
      <Textarea
        placeholder="Posez votre question détaillée sur l'agriculture..."
        value={input}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className="bg-white border-slate-200 resize-none min-h-[40px] md:min-h-[44px] max-h-[100px] md:max-h-[120px] text-xs md:text-sm"
        rows={1}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="submit"
        size="icon"
        disabled={loading || !input.trim()}
        className={cn(
          "bg-plantera-green hover:bg-plantera-green/90 text-white transition-colors",
          "flex items-center justify-center h-10 w-10 md:h-11 md:w-11 flex-shrink-0"
        )}
        aria-label="Envoyer"
      >
        <Send className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </form>
  );
}
