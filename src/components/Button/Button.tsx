"use client"

import { ButtonProps } from "@/model/ButtonProps"

export default function Button({ disabled, functionality, text } : ButtonProps) {
  return (
    <button
    onClick={functionality}
    disabled={disabled} 
    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50 disabled:hover:brightness-100">
      {text}
    </button>
  )
}