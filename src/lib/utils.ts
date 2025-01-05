import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'COP', 
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'COP', notation = 'standard' } = options

  const numericPrice =
    typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}
