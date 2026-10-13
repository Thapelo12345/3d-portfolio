  import { useRef, useState } from "react";
  import emailjs from '@emailjs/browser';

  export default function Message() {
      const formRef = useRef<HTMLFormElement>(null)
      const [status, setStatus] = useState("");

      const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = formRef.current;
        const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;

        if (!form) return;
        if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
          setStatus("Email service is not configured.");
          console.error("EmailJS environment variables are missing.");
          return;
        }

        setStatus("Sending...");
        try {
          await emailjs.sendForm(
            VITE_EMAILJS_SERVICE_ID,
            VITE_EMAILJS_TEMPLATE_ID,
            form,
            { publicKey: VITE_EMAILJS_PUBLIC_KEY },
          );
          form.reset();
          setStatus("Message sent successfully.");
        } catch (error) {
          console.error("EmailJS failed to send the message.", error);
          setStatus("Could not send your message. Please try again.");
        }
      }

    return (
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="border border-white/20 md:row-span-2 flex flex-col p-4 items-start rounded-sm"
        style={{backdropFilter: "blur(9px)"}}
      >
        <h1 className="text-white/40 mx-4 text-sm">SEND A MESSAGE</h1>

        <div className="flex flex-col md:flex-row">
          <div className="label-input">
            <label className="label-text">NAME</label>
            <input
              name="name"
              type="text"
              placeholder="Please enter your name here!.."
              className="message-input"
            />
          </div>

          <div className="label-input">
            <label className="label-text">EMAIL</label>
            <input
              name="email"
              type="email"
              placeholder="Please enter your email!.."
              className="message-input"
            />
          </div>
        </div>

        <label className="mx-2 label-text">MESSAGE</label>
        <textarea
          name="message"
          placeholder="Send me a message!.."
          className="border border-white/20 rounded-sm text-sm text-white/40 p-2 bg-[rgba(255,255,255,0.05)] w-[95%] h-40 m-2 outline-none focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
        ></textarea>

        <input
          className="text-blue-400 cursor-pointer p-2 px-4 m-2 mx-auto border border-blue-400 rounded-sm"
          type="submit"
          value="Send message"
        />
        <p role="status" aria-live="polite" className="mx-auto text-sm text-white/60">
          {status}
        </p>
       
      </form>
    );
  }
