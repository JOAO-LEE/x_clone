"use client"

import { logoutModalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { X } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";


function LogoutModal() {
  const [open, setOpen] = useRecoilState(logoutModalState);

  return (
    <>
      {
        open 
        &&
          (
            <Modal
            shouldCloseOnEsc
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            ariaHideApp={false}
            className="max-w-lg w-80 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white border-b border-gray-200 rounded-md p-1"
            >
              <div className="p-4 flex flex-col">
                <div className="border-b border-gray-200 py-2 px-1.5 flex justify-end">
                  <div
                  className="text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer w-min ">
                    <X 
                    onClick={() => setOpen(false)}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full gap-2 mt-2">
                  <p className="text-center font-semibold text-gray-500">Are you sure you want to logout?</p>
                  <div className="flex flex-col gap-0.5 w-full">
                    <button
                    onClick={() => signOut()} 
                    className="hover:bg-red-500 hover:text-white transition duration-200 ease-in-out rounded-lg">Yes</button>
                    <hr />
                    <button 
                    onClick={() => setOpen(false)} 
                    className="hover:bg-sky-500 hover:text-white transition duration-200 ease-in-out rounded-lg">Cancel</button>
                  </div>
                </div>
              </div>
            </Modal>
          )
      }
      </>
  )
}

export default LogoutModal;