import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Phone, MapPin, Clock, Send } from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// ✅ Safe formatter for seconds → HH:MM:SS
function formatTime(seconds: number | null): string {
  if (seconds === null || isNaN(seconds) || seconds < 0) return "--:--:--";
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function Contact({ isModal = false }: { isModal?: boolean }) {
  const { t } = useTranslation();
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    description: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await axios.get(
          "https://api.lingup.uz/api/auth/timer/timers"
        );
        const seconds = parseInt(response.data.remaining_seconds, 10);
        if (!isNaN(seconds)) setTime(seconds);
      } catch (error) {
        console.error("❌ Error fetching timer:", error);
      }
    };

    fetchTimer();

    const tickInterval = setInterval(() => {
      setTime((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }, 1000);

    const refreshInterval = setInterval(fetchTimer, 30000);

    return () => {
      clearInterval(tickInterval);
      clearInterval(refreshInterval);
    };
  }, []);

  const inputStyles =
    "w-full h-12 rounded-xl px-4 !bg-white text-black placeholder-gray-400 " +
    "border-2 border-gray-100 transition-all duration-300 shadow-sm " +
    "focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none";

  const textareaStyles =
    "w-full h-32 rounded-xl px-4 py-3 !bg-white text-black " +
    "border-2 border-gray-100 transition-all duration-300 resize-none shadow-sm " +
    "focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://api.lingup.uz/api/contact/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage(t("thank_you_message"));
      setFormData({ full_name: "", phone_number: "", description: "" });

      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.detail || "Something went wrong. Please try again.");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone_number") {
      if (value.length > 14) {
        setPhoneError(t("phone_error"));
        return;
      } else {
        setPhoneError("");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={isModal ? "p-0 bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-2xl overflow-y-auto max-h-[90vh] border border-white/50" : "relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-black"}>
      {!isModal && (
        <div className="absolute inset-0 -z-10">
          <div className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-100 opacity-20 rounded-full blur-3xl absolute -top-20 -left-20 animate-pulse" />
          <div className="w-48 sm:w-60 lg:w-80 h-48 sm:h-60 lg:h-80 bg-gradient-to-tr from-blue-200 via-teal-200 to-green-100 opacity-20 rounded-full blur-3xl absolute -bottom-20 -right-20 rotate-12 animate-pulse" />
          <div className="w-32 sm:w-40 lg:w-56 h-32 sm:h-40 lg:h-56 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-15 absolute top-1/3 right-1/4 rounded-full blur-2xl" />
        </div>
      )}

      <div className={isModal ? "p-8 md:p-10" : "max-w-7xl mx-auto"}>
        {!isModal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-2">
              {t("get_in_touch")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("have_questions")}
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={isModal ? "lg:col-span-12" : "lg:col-span-7"}
          >
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 mb-6 rounded-2xl bg-green-50 text-green-700 border border-green-100 text-sm font-medium shadow-sm flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {successMessage}
              </motion.div>
            )}

            <div className={`space-y-8 ${isModal ? "bg-transparent" : "bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-[32px] shadow-xl border border-white/50"}`}>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {t("send_us_message")}
                </h3>
                <p className="text-gray-500 text-sm">{t("we_will_reply_soon")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t("enter_full_name")}</Label>
                    <Input id="name" name="full_name" type="text" placeholder={t("enter_full_name")} value={formData.full_name} onChange={handleChange} required className={inputStyles} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone_number" className="text-xs font-bold text-gray-400">{t("enter_phone")}</Label>
                    <Input id="phone_number" name="phone_number" type="text" inputMode="numeric" placeholder="+998 90 123 45 67" value={formData.phone_number} onChange={handleChange} maxLength={14} required className={inputStyles} />
                    {phoneError && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase tracking-wider">{phoneError}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t("message")}</Label>
                  <Textarea id="message" name="description" placeholder={t("help_text")} rows={4} value={formData.description} onChange={handleChange} required className={textareaStyles} />
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-2xl shadow-lg border-0 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span>{t("send_message")}</span>
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Info & Timer */}
          {!isModal && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Timer Card */}
              {time !== null && time > 0 && (
                <Card className="border-0 shadow-xl rounded-[32px] bg-indigo-600 p-8 text-center overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative space-y-2">
                    <p className="text-indigo-100 text-sm font-medium uppercase tracking-[0.2em]">{t("hurry_places_are_limited")}</p>
                    <div className="text-5xl font-mono font-black text-white">{formatTime(time)}</div>
                  </div>
                </Card>
              )}

              {/* Info Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    title: t("call_us"),
                    value: "+998 (90) 499-5000",
                    href: "tel:+998904995000",
                    gradient: "from-green-500 to-emerald-400",
                    bg: "bg-green-50"
                  },
                  {
                    icon: Clock,
                    title: t("support_hours"),
                    value: "9:00 AM - 8:00 PM",
                    gradient: "from-purple-500 to-pink-500",
                    bg: "bg-purple-50"
                  },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target={item.href?.startsWith('http') ? "_blank" : undefined}
                    rel={item.href?.startsWith('http') ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.title}</h4>
                      <p className="text-gray-900 font-bold group-hover:text-indigo-600 transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
