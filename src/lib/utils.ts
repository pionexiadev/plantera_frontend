import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the human-readable text for a field status
 */
export function getStatusText(status: string) {
  switch(status) {
    case 'planted': return 'Semé';
    case 'growing': return 'En croissance';
    case 'ready': return 'Prêt à récolter';
    case 'harvested': return 'Récolté';
    default: return status;
  }
}
