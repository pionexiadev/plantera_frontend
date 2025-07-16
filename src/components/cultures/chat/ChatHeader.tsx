
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Bot } from "lucide-react";

interface ChatHeaderProps {
  messageCount: number;
  onExport: () => void;
  onClear: () => void;
}

export function ChatHeader({ messageCount, onExport, onClear }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2 md:mb-4 pb-2 md:pb-3 border-b border-slate-100">
      <div className="flex items-center gap-1 md:gap-2">
        <Bot className="h-4 w-4 md:h-5 md:w-5 text-plantera-green" />
        <span className="text-xs md:text-sm font-medium text-slate-700">
          {messageCount} messages
        </span>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="text-slate-600 hover:text-slate-800 h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm"
        >
          <Download className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          <span className="hidden sm:inline">Exporter</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="text-red-600 hover:text-red-800 h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm"
        >
          <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          <span className="hidden sm:inline">Effacer</span>
        </Button>
      </div>
    </div>
  );
}
