"use client"

import {SessionProvider} from "next-auth/react";
import { ReactNode } from "react";

import { RecoilRoot } from "recoil";

export function SessionWrapper ({ children } : { children: ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>      
        {children}
      </RecoilRoot>
    </SessionProvider>
  )
}