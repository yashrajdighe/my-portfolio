 "use client";
 
 import { useEffect, useState } from "react";
 
 export default function ScrollToTop() {
   const [isVisible, setIsVisible] = useState(false);
 
   useEffect(() => {
     const handleScroll = () => {
       setIsVisible(window.scrollY > 240);
     };
 
     handleScroll();
     window.addEventListener("scroll", handleScroll, { passive: true });
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 
   if (!isVisible) {
     return null;
   }
 
   return (
     <button
       type="button"
       aria-label="Scroll to top"
       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 text-emerald-200 shadow-lg shadow-black/40 backdrop-blur transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
     >
       <svg
         aria-hidden="true"
         viewBox="0 0 24 24"
         className="h-5 w-5"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
       >
         <path strokeLinecap="round" strokeLinejoin="round" d="M6 14l6-6 6 6" />
       </svg>
     </button>
   );
 }
