"use client"

import { ImageSquare, WarningCircle, X } from "@phosphor-icons/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { app } from "../../../firebase";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import "./styles.css";

function CreateInput() {
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState(false);
  const [postText, setPostText] = useState<string>("");
  const { data: session } = useSession();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const postCreatedRef = useRef<HTMLDivElement>(null);
  
  if (!session) return null;

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    }
    return;
  };

  const uploadImageToStorage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setLoadingImage(true);
      setUploadError(false);
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}${selectedFile!.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile!);
      
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error) => {
        setLoadingImage(false);
        setSelectedFile(null);
        setImageFileUrl(null);
        setUploadError(true);
        reject(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setLoadingImage(false);
          resolve(downloadUrl);
        });
      });
    });
  };
  
  const handleSubmit = async (): Promise<void> => {
    const db = getFirestore(app);
    
    let imageUrl = null;
    if (selectedFile) {
      try {
        setLoadingPost(true);
        imageUrl = await uploadImageToStorage();
        console.log(imageUrl)
      } catch (error) {
        console.error("Error uploading image: ", error);
        setLoadingPost(false);
        return;
      }
    }

    const postData = {
      name: session.user.name,
      uid: session.user.uid,
      username: session.user.username,
      postText,
      profileImage: session.user.image,
      timestamp: serverTimestamp(),
      imageFileUrl: imageUrl,
    };

    await addDoc(collection(db, 'posts'), postData);

    setLoadingPost(false);
    setPostText("");
    setImageFileUrl(null);
    setSelectedFile(null);
    postCreatedConfirmation();
    postCreatedRef.current!.addEventListener("animationend", () => {
      postCreatedRef.current!.style.animation = "";
      location.reload();
    }, false);
  };

  const postCreatedConfirmation = () => {
    if (postCreatedRef.current) {
      postCreatedRef.current.style.animation = "post-created-animation-showing 6s normal 500ms ease-in-out";
      postCreatedRef.current.addEventListener("animationend", () => {
        postCreatedRef.current!.style.animation = "";
      }, false);
    }
  };
  
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full relative">
      <div 
      className={`bg-blue-400 p-2 rounded-full text-gray-100 font-bold text-sm z-50 post-created`}
      ref={postCreatedRef}
      >
        <p>Post created!</p>
      </div>
      <img 
      src={session.user.image} 
      alt="user image" 
      className="h-11 w-11 rounded-full cursor-point hover:brightness-75 transition"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
        spellCheck={false} 
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
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
                className={`w-full max-h-[250px] object-cover rounded-sm ${loadingImage && "animate-pulse"}`} 
                onError={(e) => e.currentTarget.src = "" }
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
              <div className="text-semibold text-red-500 flex gap-2 text-xs items-center divide-y-0">
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
          <button
          onClick={handleSubmit}
          disabled={postText?.trim() === "" || loadingImage || loadingPost} 
          className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50 disabled:hover:brightness-100">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateInput