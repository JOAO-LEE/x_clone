"use client"

import { ImageSquare, WarningCircle, X } from "@phosphor-icons/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { app } from "../../../firebase";

function CreateInput() {
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [uploadError, setUploadError] = useState(false);
  const { data: session } = useSession();
  const filePickerRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();

    }
  }, [selectedFile]);

  
  const addImageToPost = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    }
    return;
  }
;
  const uploadImageToStorage = () => {
    setLoadingImage(true);
    setUploadError(false);
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}${selectedFile!.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile!);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress)
    }, (error) => {
      setLoadingImage(false);
      setSelectedFile(null);
      setImageFileUrl(null);
      setUploadError(true);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((dowloadUrl) => {
        setImageFileUrl(dowloadUrl);
        setLoadingImage(false);
      });
    })

  };

  if (!session) return null;
  
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img 
      src={session.user.image} 
      alt="user image" 
      className="h-11 w-11 rounded-full cursor-point hover:brightness-75 transition"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea 
        placeholder="What is happening!?" 
        rows={2}
        className="border-none w-full outline-none tracking-wide min-h-[3.125rem] text-gray-700 placeholder-shown:text-lg resize-none text-lg"
        >
        </textarea>
        {
          (selectedFile && imageFileUrl)
          &&
            ( 
              <div 
              className="relative" 
              onClick={() => {
              
              }}>
                <img 
                src={imageFileUrl} 
                // alt="Selected image" 
                className={`w-full max-h-[250px] object-cover rounded-sm ${loadingImage && "animate-pulse"}`} 
                onError={(e) => e.currentTarget.src = ""}
                />
                <div 
                className="group absolute top-2 right-2 text-xl bg-black bg-opacity-90 rounded-full p-2 text-gray-100 cursor-pointer hover:bg-gray-600 transition duration-200">
                  <X  className="group-hover:scale-110 transition duration-500"/>
                </div>
              </div>
            )
        }
        {
          uploadError 
          && 
            (
              <div className="text-semibold text-red-500 flex gap-2 text-xs items-center">
                <WarningCircle />
                <span>An error occurred uploading the image: the image is too big!</span>
              </div>
            )
        }
        <div className="flex items-center justify-between pt-2.5">
          <ImageSquare
          className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" 
          onClick={() => filePickerRef.current?.click()}
          />
          <input 
          type="file"
          className="hidden"
          accept="image/*" 
          ref={filePickerRef}
          onChange={(e) => addImageToPost(e) }  

          />
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreateInput