"use client"

import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modalAtom";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Comment modal</h1>
      {open && <h2>Is open! :D</h2>}
    </div>
  )
}