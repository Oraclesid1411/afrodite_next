import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind CSS classes with clsx and tailwind-merge
 * @param {...ClassValue} inputs - Class names or class conditions to merge
 * @returns {string} - Merged class names string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
