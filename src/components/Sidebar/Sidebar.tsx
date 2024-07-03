"use client"

import { XLogo, House } from "@phosphor-icons/react/dist/ssr";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MiniProfile from "../MiniProfile/MiniProfile";
import { SignIn, SignOut } from "@phosphor-icons/react";

function Sidebar() {
  const { data: session } = useSession();

  const handleSignIn = () => {
    if (!session) {
      signIn("google");
      return;
    }
    signOut();
  }

  return (
    <nav className="flex md:flex-col p-3 justify-between md:h-screen w-full lg:w-fit lg:justify-start h-min">
      <div 
      className="flex md:flex-col gap-4 w-full justify-between items-center lg:justify-start xl:w-fit h-min lg:h-screen"
      >
        <Link 
        href="/" 
        className="w-fit"
        >
          <XLogo
          className="w-[3.7rem] h-[3.7rem] p-3 hover:bg-gray-100 rounded-full transition duration-200"
          /> 
        </Link>
        <Link 
        href="/" 
        className="flex gap-2 items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <House 
          className="w-8 h-8" 
          weight="fill"
          />
          <span 
          className="font-bold hidden lg:inline"
          >
            Home
          </span>
        </Link>
          <button
          onClick={handleSignIn}
          title={session ? "Sign out" : "Sign in"} 
          className="font-semibold transition-all duration-200 hover:bg-gray-100 lg:hover:brightness-95 lg:w-48 lg:h-9 lg:shadow-md  lg:bg-blue-400 lg:text-white rounded-full group"
          >
            {
              !session 
              ?
                (
                  <div className="lg:hidden flex flex-col p-3 items-center">
                    <SignIn className="h-8 w-8 lg:hidden group-hover:text-sky-500" />
                    <p className="text-[9px]">Login</p>
                  </div>
                )
              :
                (
                  <div className="lg:hidden flex flex-col p-3 items-center">
                    <SignOut className="h-6 w-6 lg:hidden  group-hover:text-red-500" />
                    <p className="text-[9px]">Logout</p>
                  </div>
                )
            }
            <p className="hidden lg:inline">{!session ? "Sign in" : "Sign out"}</p>
          </button>
      </div>
      { 
        session 
        && 
          (
            <MiniProfile session={session} />
          )
      }
    </nav>
  )
}

export default Sidebar