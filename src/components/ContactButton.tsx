import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

interface ContactButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export function ContactButton({ isOpen, onClick }: ContactButtonProps) {
    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Button
                    onClick={onClick}
                    className={`h-16 w-16 rounded-full shadow-2xl relative z-[100] transition-all cursor-pointer duration-300 border-0 ${isOpen
                        ? "bg-gray-800 hover:bg-gray-900"
                        : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-indigo-500/25"
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="h-8 w-8 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative"
                            >
                                <MessageCircle className="h-8 w-8 text-white" />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 border-2 border-white"></span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>
        </div>
    );
}
