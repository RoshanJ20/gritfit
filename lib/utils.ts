import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { site } from "@/content/site"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Deep link to the club's WhatsApp chat. `wa.me` hands off to the app on mobile
 * and WhatsApp Web on desktop. Pass `message` to override the default prefilled
 * text from `site.whatsapp`.
 */
export function whatsappUrl(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}
