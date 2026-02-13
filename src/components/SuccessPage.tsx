import { motion } from "framer-motion";
import { CheckCircle2, Home, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import type { ViewType } from "../App";

interface SuccessPageProps {
    setView: (view: ViewType) => void;
}

export function SuccessPage({ setView }: SuccessPageProps) {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full text-center"
            >
                <div className="relative mb-8 flex justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center relative z-10"
                    >
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </motion.div>
                    {/* Animated Background Rings */}
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-green-200 rounded-full blur-xl scale-125 -z-1"
                    />
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-black text-gray-900 mb-4 tracking-tight"
                >
                    Tabriklaymiz!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-gray-600 mb-10 leading-relaxed"
                >
                    To'lovingiz qabul qilindi. Yaqin vaqt ichida{" "}
                    <span className="text-purple-600 font-bold uppercase tracking-wide">adminlarimiz</span>{" "}
                    siz bilan bog'lanishadi va barcha ma'lumotlarni taqdim etishadi.
                </motion.p>

                <div className="flex justify-center">
                    <Button
                        className="py-6 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-200 border-none font-bold flex gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Yordam kerakmi?
                    </Button>
                </div>
            </motion.div>

            {/* Decorative background elements */}
            <div className="fixed top-1/4 left-1/4 w-[300px] h-[300px] bg-green-200/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="fixed bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-200/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
    );
}
