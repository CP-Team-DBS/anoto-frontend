import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreToText(score: number) {
  if (score >= 3) return "Tinggi";
  if (score >= 2) return "Sedang";
  if (score >= 1) return "Rendah";

  return "-";
}
