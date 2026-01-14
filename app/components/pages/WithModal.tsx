import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import { useMatches } from "@remix-run/react";

interface WithModalProps {
  onOpenWhen?: boolean;
  autoOpenUrl?: string; // Changed String to string primitive
  Header?: ReactNode;
  Body?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  blockScroll?: boolean;
  bg?: string;
  [key: string]: any;
}

export default function WithModal({
  onOpenWhen,
  autoOpenUrl,
  Header,
  Body,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  blockScroll = false,
  bg = "rgba(0, 0, 0, 0.5)",
  ...props
}: WithModalProps) {
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  
  // Determine if modal should be open based on props
  const isOpen = externalIsOpen || onOpenWhen || (autoOpenUrl && lastMatch.pathname === autoOpenUrl);

  // Handle closing
  const handleClose = () => {
    if (externalOnClose) externalOnClose();
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      if (blockScroll) document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, blockScroll]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Modal Panel */}
      <div 
        className="relative z-10 w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all scale-100 animate-fade-in"
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
           <div className="text-lg font-bold text-gray-900">{Header}</div>
           <button
             onClick={handleClose}
             className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
             aria-label="Close"
           >
             <FaTimes className="w-5 h-5" />
           </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          {Body}
        </div>
      </div>
    </div>
  );
}
