import { useRef } from "react";

export default function Message() {
  const emailRef = useRef("");
  const nameRef = useRef("");
  const messageRef = useRef("");

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className="border border-white/20 md:row-span-2 flex flex-col p-4 items-start rounded-sm"
      style={{
        backdropFilter: "blur(9px)",
      }}
    >
      <h1 className="text-white/40 mx-4 text-sm">SEND A MESSAGE</h1>

      <div className="flex flex-col md:flex-row">
        <div className="label-input">
          <label className="label-text">NAME</label>
          <input
            ref={inputNameRef}
            type="text"
            placeholder="Please enter your name here!.."
            className="message-input"
            onChange={(e) => (nameRef.current = e.target.value)}
          />
        </div>

        <div className="label-input">
          <label className="label-text">EMAIL</label>
          <input
            ref={inputEmailRef}
            type="email"
            placeholder="Please enter your email!.."
            className="message-input"
            onChange={(e) => (emailRef.current = e.target.value)}
          />
        </div>
      </div>

      <label className="mx-2 label-text">MESSAGE</label>
      <textarea
        ref={textAreaRef}
        placeholder="Send me a message!.."
        className="border border-white/20 rounded-sm text-sm text-white/40 p-2 bg-[rgba(255,255,255,0.05)] w-[95%] h-40 m-2 outline-none focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
        onChange={(e) => (messageRef.current = e.target.value)}
      ></textarea>

      <button
        className="text-blue-400 cursor-pointer p-2 px-4 m-2 mx-auto border border-blue-400 rounded-sm"
        onClick={() =>{
        nameRef.current = ""
        emailRef.current = ""
        messageRef.current = ""

        if(inputNameRef.current) inputNameRef.current.value = "" 
        if(inputEmailRef.current) inputEmailRef.current.value = ""
        if(textAreaRef.current) textAreaRef.current.value = "" 

          }
        }
      >
        Send message
      </button>
    </div>
  );
}
