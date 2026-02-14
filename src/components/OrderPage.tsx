import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
    ChevronDown,
    Copy,
    Upload,
    Send,
    Phone as PhoneIcon,
    CheckCircle2,
    FileText,
    Clock,
    Loader2
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { ViewType } from "../App";

interface OrderPageProps {
    setView: (view: ViewType) => void;
}

interface PaymentCard {
    id: number | string;
    card_number: string;
    full_name: string;
    type: string;
}

interface PricePlan {
    id: number | string;
    course: string;
    price: string;
    order?: number;
    description?: string;
    is_active: boolean;
}

type PaymentApiResponse = PaymentCard[] | { results?: PaymentCard[] };
type PriceApiResponse = PricePlan[] | { results?: PricePlan[] };

const isPaymentCard = (value: unknown): value is PaymentCard => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const candidate = value as Partial<PaymentCard>;
    return (
        (typeof candidate.id === "number" || typeof candidate.id === "string") &&
        typeof candidate.card_number === "string" &&
        typeof candidate.full_name === "string" &&
        typeof candidate.type === "string"
    );
};

const isPricePlan = (value: unknown): value is PricePlan => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const candidate = value as Partial<PricePlan>;
    return (
        (typeof candidate.id === "number" || typeof candidate.id === "string") &&
        typeof candidate.course === "string" &&
        typeof candidate.price === "string" &&
        typeof candidate.is_active === "boolean"
    );
};

export function OrderPage({ setView }: OrderPageProps) {
    const { t } = useTranslation();
    const [plans, setPlans] = useState<PricePlan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
    const [isPlansOpen, setIsPlansOpen] = useState(false);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);
    const [plansError, setPlansError] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [isCopiedId, setIsCopiedId] = useState<string | null>(null);
    const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
    const [isLoadingCards, setIsLoadingCards] = useState(true);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [confirmationForm, setConfirmationForm] = useState({
        full_name: "",
        phone: "",
        telegram_username: "",
    });
    const [confirmationError, setConfirmationError] = useState<string | null>(null);
    const [isSubmittingConfirmation, setIsSubmittingConfirmation] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const planDropdownRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        let isMounted = true;

        const fetchPaymentCards = async () => {
            try {
                setIsLoadingCards(true);
                setPaymentError(null);

                const response = await axios.get<PaymentApiResponse>("https://api.lingup.uz/api/payments/");
                const payload = response.data;
                const rawCards = Array.isArray(payload) ? payload : (Array.isArray(payload.results) ? payload.results : []);
                const cards = rawCards.filter(isPaymentCard);

                if (!isMounted) {
                    return;
                }

                setPaymentCards(cards);
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                console.error("Error fetching payment cards:", error);
                setPaymentError("To'lov kartalarini yuklab bo'lmadi. Iltimos, qayta urinib ko'ring.");
            } finally {
                if (isMounted) {
                    setIsLoadingCards(false);
                }
            }
        };

        fetchPaymentCards();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchPlans = async () => {
            try {
                setIsLoadingPlans(true);
                setPlansError(null);

                const response = await axios.get<PriceApiResponse>("https://api.lingup.uz/api/price_list/");
                const payload = response.data;
                const rawPlans = Array.isArray(payload) ? payload : (Array.isArray(payload.results) ? payload.results : []);
                const activePlans = rawPlans
                    .filter(isPricePlan)
                    .filter((plan) => plan.is_active)
                    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));

                if (!isMounted) {
                    return;
                }

                setPlans(activePlans);
                setSelectedPlanId((prev) => {
                    if (prev && activePlans.some((plan) => String(plan.id) === prev)) {
                        return prev;
                    }
                    return activePlans.length > 0 ? String(activePlans[0].id) : null;
                });
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                console.error("Error fetching price plans:", error);
                setPlansError("Tariflarni yuklab bo'lmadi. Iltimos, qayta urinib ko'ring.");
            } finally {
                if (isMounted) {
                    setIsLoadingPlans(false);
                }
            }
        };

        fetchPlans();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!planDropdownRef.current) {
                return;
            }
            if (!planDropdownRef.current.contains(event.target as Node)) {
                setIsPlansOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatPrice = (price: string) => {
        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice)) {
            return price;
        }
        return numericPrice.toLocaleString("en-US", { maximumFractionDigits: 0 });
    };

    const formatCardNumber = (cardNumber: string) => {
        return cardNumber.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    };

    const getCardAccent = (type: string) => {
        const normalizedType = type.toUpperCase();
        if (normalizedType === "VISA") {
            return {
                overlay: "from-orange-500/5",
                badge: "bg-orange-100 text-orange-600",
            };
        }
        if (normalizedType === "UZCARD") {
            return {
                overlay: "from-emerald-500/5",
                badge: "bg-emerald-100 text-emerald-600",
            };
        }
        return {
            overlay: "from-purple-500/5",
            badge: "bg-purple-100 text-purple-600",
        };
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setIsCopiedId(id);
        setTimeout(() => setIsCopiedId(null), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setConfirmationError(null);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0]);
            setConfirmationError(null);
        }
    };

    const handleFormFieldChange = (field: "full_name" | "phone" | "telegram_username", value: string) => {
        setConfirmationForm((prev) => ({
            ...prev,
            [field]: value,
        }));
        setConfirmationError(null);
    };

    const handleConfirmationSubmit = async () => {
        const fullName = confirmationForm.full_name.trim();
        const phone = confirmationForm.phone.trim();
        const telegramUsername = confirmationForm.telegram_username.trim();

        if (!fullName || !phone || !telegramUsername || !uploadedFile) {
            setConfirmationError("Iltimos, barcha maydonlarni to'ldiring va chek rasmini yuklang.");
            return;
        }

        try {
            setIsSubmittingConfirmation(true);
            setConfirmationError(null);

            const formData = new FormData();
            formData.append("full_name", fullName);
            formData.append("phone", phone);
            formData.append("telegram_username", telegramUsername);
            formData.append("check_image", uploadedFile);

            await axios.post("https://api.lingup.uz/api/confirmations/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setView('success');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.detail;
                setConfirmationError(typeof message === "string" ? message : "Tasdiqlash yuborilmadi. Iltimos, qayta urinib ko'ring.");
            } else {
                setConfirmationError("Tasdiqlash yuborilmadi. Iltimos, qayta urinib ko'ring.");
            }
        } finally {
            setIsSubmittingConfirmation(false);
        }
    };

    const selectedPlan = plans.find((plan) => String(plan.id) === selectedPlanId) ?? null;
    const selectedPlanName = selectedPlan?.course ?? "Tarif tanlang";
    const selectedPlanPrice = selectedPlan ? formatPrice(selectedPlan.price) : "0";
    const isConfirmationFormValid =
        confirmationForm.full_name.trim().length > 0 &&
        confirmationForm.phone.trim().length > 0 &&
        confirmationForm.telegram_username.trim().length > 0 &&
        !!uploadedFile;

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
                            <div className="text-3xl font-bold text-orange-500">{selectedPlanPrice} <span className="text-lg font-medium text-gray-500">sum</span></div>
                        </div>

                        <div className="relative mb-8" ref={planDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsPlansOpen((prev) => !prev)}
                                disabled={isLoadingPlans || plans.length === 0}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="font-medium text-gray-700">
                                    {isLoadingPlans ? "Tariflar yuklanmoqda..." : selectedPlanName}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPlansOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isPlansOpen && plans.length > 0 && (
                                <div className="absolute z-20 mt-2 w-full rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                                    {plans.map((plan) => {
                                        const isSelected = String(plan.id) === selectedPlanId;
                                        return (
                                            <button
                                                key={plan.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedPlanId(String(plan.id));
                                                    setIsPlansOpen(false);
                                                }}
                                                className={`w-full px-4 py-3 text-left transition-colors ${isSelected ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-50"}`}
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="font-medium">{plan.course}</span>
                                                    <span className="text-sm font-semibold">{formatPrice(plan.price)} sum</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {plansError ? (
                                <p className="mt-2 text-sm text-red-600 font-medium">{plansError}</p>
                            ) : (
                                <p className="mt-2 text-sm text-purple-600 font-medium">Tanlangan tarif: {selectedPlanName}</p>
                            )}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-800">1. Quyidagi to'lov turlaridan biri orqali to'lovni amalga oshiring</h3>
                            {isLoadingCards && (
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-gray-500">
                                    To'lov kartalari yuklanmoqda...
                                </div>
                            )}

                            {paymentError && !isLoadingCards && (
                                <div className="p-6 bg-red-50 rounded-3xl border border-red-100 text-red-600">
                                    {paymentError}
                                </div>
                            )}

                            {!isLoadingCards && !paymentError && paymentCards.map((card) => {
                                const copyId = `payment-card-${card.id}`;
                                const formattedCardNumber = formatCardNumber(card.card_number);
                                const accent = getCardAccent(card.type);

                                return (
                                    <div
                                        key={card.id}
                                        className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group overflow-hidden cursor-pointer"
                                        onClick={() => handleCopy(formattedCardNumber, copyId)}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${accent.overlay} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        <div className="flex items-center gap-3 mb-4 relative z-10">
                                            <span className="font-bold text-gray-900">{card.type}</span>
                                            <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${accent.badge}`}>
                                                {card.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between relative z-10">
                                            <div>
                                                <div className="text-2xl font-mono font-bold text-gray-800 tracking-widest mb-1">{formattedCardNumber}</div>
                                                <div className="text-sm text-gray-500">{card.full_name}</div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-xl bg-white shadow-sm hover:bg-gray-100 hover:text-white hover:shadow-md transition-all active:scale-95 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCopy(formattedCardNumber, copyId);
                                                }}
                                            >
                                                {isCopiedId === copyId ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}

                            {!isLoadingCards && !paymentError && paymentCards.length === 0 && (
                                <div className="p-6 bg-yellow-50 rounded-3xl border border-yellow-100 text-yellow-700">
                                    Hozircha to'lov kartalari mavjud emas.
                                </div>
                            )}
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
                        <div className="space-y-4 mb-6">
                            <div className="space-y-2">
                                <Label htmlFor="confirmation-full-name" className="text-sm font-semibold text-gray-700">
                                    To'liq ism
                                </Label>
                                <Input
                                    id="confirmation-full-name"
                                    type="text"
                                    value={confirmationForm.full_name}
                                    onChange={(e) => handleFormFieldChange("full_name", e.target.value)}
                                    placeholder="Ismingizni kiriting"
                                    className="h-11 rounded-xl border-gray-200 !bg-white !text-black placeholder:text-gray-400 dark:!bg-white dark:!text-black dark:placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmation-phone" className="text-sm font-semibold text-gray-700">
                                    Telefon raqam
                                </Label>
                                <Input
                                    id="confirmation-phone"
                                    type="text"
                                    inputMode="tel"
                                    value={confirmationForm.phone}
                                    onChange={(e) => handleFormFieldChange("phone", e.target.value)}
                                    placeholder="+998 90 123 45 67"
                                    className="h-11 rounded-xl border-gray-200 !bg-white !text-black placeholder:text-gray-400 dark:!bg-white dark:!text-black dark:placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmation-telegram" className="text-sm font-semibold text-gray-700">
                                    Telegram username
                                </Label>
                                <Input
                                    id="confirmation-telegram"
                                    type="text"
                                    value={confirmationForm.telegram_username}
                                    onChange={(e) => handleFormFieldChange("telegram_username", e.target.value)}
                                    placeholder="@username"
                                    className="h-11 rounded-xl border-gray-200 !bg-white !text-black placeholder:text-gray-400 dark:!bg-white dark:!text-black dark:placeholder:text-gray-400"
                                />
                            </div>
                        </div>

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

                        {confirmationError && (
                            <p className="mt-4 text-sm text-red-600 font-medium">
                                {confirmationError}
                            </p>
                        )}

                        <Button
                            disabled={!isConfirmationFormValid || isSubmittingConfirmation}
                            onClick={handleConfirmationSubmit}
                            className={`w-full mt-6 py-7 cursor-pointer text-lg font-bold rounded-2xl border-none transition-all active:scale-95 ${!isConfirmationFormValid || isSubmittingConfirmation
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-200"
                                }`}
                        >
                            {isSubmittingConfirmation ? (
                                <span className="inline-flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Yuborilmoqda...
                                </span>
                            ) : (
                                "Davom etish"
                            )}
                        </Button>
                    </Card>

                    {/* Contact Links */}
                    <div className="text-center space-y-4 pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Yordam kerakmi? Biz bilan bog'laning:</p>
                        <div className="space-y-3">
                            <Button variant="ghost" asChild className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-2xl py-6 font-bold flex gap-2 transition-colors">
                                <a href="https://t.me/lingup_admin" target="_blank" rel="noreferrer">
                                    <Send className="w-5 h-5" /> @lingup_admin
                                </a>
                            </Button>
                            <Button variant="ghost" asChild className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-2xl py-6 font-bold flex gap-2 transition-colors">
                                <a href="tel:+998904995000">
                                    <PhoneIcon className="w-5 h-5" /> +998(90)499-50-00
                                </a>
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
