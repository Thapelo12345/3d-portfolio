import { createRoot } from 'react-dom/client'
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import App from './App.tsx'

gsap.registerPlugin(SplitText, ScrollTrigger);

createRoot(document.getElementById('root')!).render(
    <App />
)
