import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    ChevronDown,
    Copy,
    Upload,
    Send,
    Phone as PhoneIcon,
    CheckCircle2,
    FileText,
    Clock
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { ViewType } from "../App";

interface OrderPageProps {
    setView: (view: ViewType) => void;
}

export function OrderPage({ setView }: OrderPageProps) {
    const { t } = useTranslation();
    const [selectedPlan] = useState("Start");
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [isCopiedId, setIsCopiedId] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Preview logic
    useEffect(() => {
        if (!uploadedFile) {
            setPreviewUrl(null);
            return;
        }

        if (uploadedFile.type.startsWith('image/')) {
            const url = URL.createObjectURL(uploadedFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [uploadedFile]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setIsCopiedId(id);
        setTimeout(() => setIsCopiedId(null), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20 pb-20 px-4 min-h-screen"
        >
            <div className="max-w-6xl mx-auto mb-3">
                <Button
                    variant="ghost"
                    onClick={() => setView('landing')}
                    className="text-gray-500 hover:text-gray-900 flex items-center gap-2 group transition-all"
                >
                    <ChevronDown className="w-5 h-5 rotate-90 group-hover:-translate-x-1 transition-transform" />
                    Asosiy sahifaga qaytish
                </Button>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Payment Details */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-8 space-y-6"
                >
                    <Card className="p-8 rounded-[32px] border-none shadow-xl bg-white/80 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">{t("Kurs narxi") || "Kursni tanlang"}</h1>
                            <div className="text-3xl font-bold text-orange-500">3.400.000 <span className="text-lg font-medium text-gray-500">so'm</span></div>
                        </div>

                        <div className="relative mb-8">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                                <span className="font-medium text-gray-700">{selectedPlan}</span>
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="mt-2 text-sm text-purple-600 font-medium">Tanlangan tarif: {selectedPlan}</p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-800">1. Quyidagi to'lov turlaridan biri orqali to'lovni amalga oshiring</h3>

                            {/* Humo Card */}
                            <div
                                className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group overflow-hidden cursor-pointer"
                                onClick={() => handleCopy("9860 1701 1416 8819", "humo")}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <span className="font-bold text-gray-900">Humo</span>
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-bold rounded uppercase tracking-wider">Humo</span>
                                </div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <div className="text-2xl font-mono font-bold text-gray-800 tracking-widest mb-1">9860 1701 1416 8819</div>
                                        <div className="text-sm text-gray-500">Madina Fozilova</div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-xl bg-white shadow-sm hover:bg-gray-100 hover:text-white hover:shadow-md transition-all active:scale-95 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy("9860 1701 1416 8819", "humo");
                                        }}
                                    >
                                        {isCopiedId === "humo" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                                    </Button>
                                </div>
                            </div>

                            {/* Visa Card */}
                            <div
                                className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group overflow-hidden cursor-pointer"
                                onClick={() => handleCopy("4023 0605 0883 7977", "visa")}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-center mb-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-900">Visa</span>
                                        <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-bold rounded uppercase tracking-wider">Visa</span>
                                    </div>
                                    <div className="text-lg font-bold text-orange-500">3.400.000 <span className="text-xs font-medium text-gray-400">so'm</span></div>
                                </div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <div className="text-2xl font-mono font-bold text-gray-800 tracking-widest mb-1">4023 0605 0883 7977</div>
                                        <div className="text-sm text-gray-500">Madina Fozilova</div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-xl bg-white shadow-sm hover:bg-gray-50 hover:text-white hover:shadow-md transition-all active:scale-95 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy("4023 0605 0883 7977", "visa");
                                        }}
                                    >
                                        {isCopiedId === "visa" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 space-y-4">
                            <p className="text-sm text-gray-500">
                                2. To'lovingiz muvaffaqiyatli amalga oshganini tasdiqlovchi rasmni saqlab oling (screenshot).
                            </p>
                            <p className="text-sm text-gray-500">
                                3. To'lovingiz rasmini yuklang va <span className="text-purple-600 font-bold tracking-wide uppercase text-xs">davom etish</span> tugmasini bosing.
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Right Column: Timer & Upload */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="lg:col-span-4 space-y-6"
                >
                    {/* Timer Card */}
                    <Card className="p-8 rounded-[32px] border-none shadow-lg bg-white/80 backdrop-blur-md text-center">
                        <p className="text-sm text-gray-500 mb-2">To'lov qilish muddati tugashiga oz qoldi:</p>
                        <div className="text-4xl font-black text-gray-900 tracking-tighter flex items-center justify-center gap-2">
                            <Clock className="w-6 h-6 text-indigo-500" />
                            {formatTime(timeLeft)}
                        </div>
                    </Card>

                    {/* Upload Card */}
                    <Card className="p-8 rounded-[32px] border-none shadow-lg bg-white/80 backdrop-blur-md">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer ${uploadedFile ? 'border-green-400 bg-green-50/50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'}`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={onDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                            />
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Receipt Preview" className="w-full h-full object-cover" />
                                ) : uploadedFile ? (
                                    <FileText className="w-8 h-8 text-green-500" />
                                ) : (
                                    <Upload className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">
                                {uploadedFile ? uploadedFile.name : "Chek rasmini yuklang"}
                            </h4>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">
                                PDF, PNG yoki JPG (maks. 5 MB)
                            </p>
                        </motion.div>

                        <Button
                            disabled={!uploadedFile}
                            onClick={() => setView('success')}
                            className={`w-full mt-6 py-7 cursor-pointer text-lg font-bold rounded-2xl border-none transition-all active:scale-95 ${!uploadedFile
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-200"
                                }`}
                        >
                            Davom etish
                        </Button>
                    </Card>

                    {/* Contact Links */}
                    <div className="text-center space-y-4 pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Yordam kerakmi? Biz bilan bog'laning:</p>
                        <div className="space-y-3">
                            <Button variant="ghost" className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-2xl py-6 font-bold flex gap-2 transition-colors">
                                <Send className="w-5 h-5" /> Adminga yozish
                            </Button>
                            <Button variant="ghost" className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-2xl py-6 font-bold flex gap-2 transition-colors">
                                <PhoneIcon className="w-5 h-5" /> +998 77 140 71 71
                            </Button>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Background elements to match the theme */}
            <div className="fixed top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </motion.div>
    );
}
