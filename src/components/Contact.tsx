import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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

export function Contact() {
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
          "/api/auth/timer/timers"
        );
        console.log(response)
        const seconds = parseInt(response.data.remaining_seconds, 10);
        if (!isNaN(seconds)) setTime(seconds);
      } catch (error) {
        console.error("❌ Error fetching timer:", error);
      }
    };

    fetchTimer(); // initial fetch

    // Local countdown every second
    const tickInterval = setInterval(() => {
      setTime((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }, 1000);

    // Refresh from API every 30s to avoid drift
    const refreshInterval = setInterval(fetchTimer, 30000);

    return () => {
      clearInterval(tickInterval);
      clearInterval(refreshInterval);
    };
  }, []);

  const inputStyles =
    "w-full h-12 rounded-xl px-4 bg-gradient-to-br from-white via-gray-50 to-indigo-50 text-black placeholder-gray-600 " +
    "border-2 border-indigo-200 transition-all duration-300 shadow-md " +
    "focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none focus:shadow-lg " +
    "hover:shadow-lg hover:border-indigo-300";

  const textareaStyles =
    "w-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] rounded-xl px-4 py-3 bg-gradient-to-br from-white via-gray-50 to-indigo-50 text-black placeholder-gray-600 " +
    "border-2 border-indigo-200 transition-all duration-300 resize-none shadow-md " +
    "focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none focus:shadow-lg " +
    "hover:shadow-lg hover:border-indigo-300";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contact/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);

      setSuccessMessage(t("thank_you_message"));
      setFormData({ full_name: "", phone_number: "", description: "" });

      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Axios error submitting form:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.detail ||
          "Something went wrong. Please try again."
        );
      } else if (error instanceof Error) {
        console.error("❌ Error submitting form:", error.message);
        alert(error.message);
      } else {
        console.error("❌ Unknown error submitting form:", error);
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
    <section
      id="contact"
      className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-black"
    >
      {/* Enhanced Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-100 opacity-20 rounded-full blur-3xl absolute -top-20 -left-20 animate-pulse" />
        <div className="w-48 sm:w-60 lg:w-80 h-48 sm:h-60 lg:h-80 bg-gradient-to-tr from-blue-200 via-teal-200 to-green-100 opacity-20 rounded-full blur-3xl absolute -bottom-20 -right-20 rotate-12 animate-pulse" />
        <div className="w-32 sm:w-40 lg:w-56 h-32 sm:h-40 lg:h-56 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-15 absolute top-1/3 right-1/4 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-2 drop-shadow-sm">
            {t("get_in_touch")}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("have_questions")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left column - Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
          >
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative p-4 sm:p-6 mb-6 rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-green-800 text-base sm:text-lg shadow-2xl border border-green-200 overflow-hidden"
              >
                {/* Decorative glow for success message */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 blur-xl" />
                <p className="relative font-medium">{successMessage}</p>
              </motion.div>
            )}

            <Card className="border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-white via-gray-50 to-indigo-50 backdrop-blur-sm relative overflow-hidden h-fit">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-2xl" />

              <CardHeader className="relative pb-2 sm:pb-2">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-center leading-tight">
                  {t("send_us_message")}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="name" className="text-gray-700 text-base sm:text-lg font-semibold block">
                      {t("enter_full_name")}
                    </Label>
                    <Input
                      id="name"
                      name="full_name"
                      type="text"
                      placeholder={t("enter_full_name")}
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Label htmlFor="phone_number" className="text-gray-700 text-base sm:text-lg font-semibold block">
                      {t("enter_phone")}
                    </Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder={t("enter_phone")}
                      value={formData.phone_number}
                      onChange={handleChange}
                      maxLength={14}
                      required
                      className={inputStyles}
                    />
                    {phoneError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg"
                      >
                        {phoneError}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Label htmlFor="message" className="text-gray-700 text-base sm:text-lg font-semibold block">
                      {t("message")}
                    </Label>
                    <Textarea
                      id="message"
                      name="description"
                      placeholder={t("help_text")}
                      rows={8}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className={textareaStyles}
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="pt-2 sm:pt-4"
                  >
                    <Button
                      type="submit"
                      className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-base sm:text-lg py-4 sm:py-6 rounded-xl shadow-2xl border-0 overflow-hidden transition-all duration-300"
                    >
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-xl" />
                      <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5 relative" />
                      <span className="relative">{t("send_message")}</span>
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right column - Enhanced Timer + Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="space-y-6 sm:space-y-8 h-fit">
              {/* ✅ Timer Card */}
              {time !== null && time > 0 && (
                <Card className="border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                  <CardContent className="p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-6 text-center relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

                    {/* Header */}
                    <p className="relative text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-700 leading-tight">
                      {t("hurry_places_are_limited")}
                    </p>

                    {/* Time Display */}
                    <span className="relative text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-mono font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse drop-shadow-sm block">
                      {formatTime(time)}
                    </span>

                    {/* Subtext */}
                    <p className="relative text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed">
                      {t("dont_miss_out_spots")}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Enhanced Info Cards */}
              <Card className="border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-white via-gray-50 to-purple-50 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-2xl" />

                <CardContent className="relative p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: t("call_us"),
                      details: ["+998 (90) 499-5000"],
                      delay: 0.2,
                      gradient: "from-green-500 to-emerald-400",
                      bgGradient: "from-green-50 to-emerald-50",
                    },
                    {
                      icon: MapPin,
                      title: t("visit_us"),
                      details: [
                        "Tashkent, Uzbekistan",
                        "Mirzo Ulugbek tumani, Qorasu-3 14-uy",
                      ],
                      delay: 0.3,
                      gradient: "from-orange-500 to-yellow-400",
                      bgGradient: "from-orange-50 to-yellow-50",
                    },
                    {
                      icon: Clock,
                      title: t("support_hours"),
                      details: [
                        "Dushanba- Juma: 9:00 AM - 8:00 PM",
                        "Shanba - Yakshanba: 10:00 AM - 6:00 PM",
                      ],
                      delay: 0.4,
                      gradient: "from-purple-500 to-pink-500",
                      bgGradient: "from-purple-50 to-pink-50",
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      className={`flex items-start space-x-3 sm:space-x-4 lg:space-x-5 p-3 sm:p-4 lg:p-5 rounded-2xl bg-gradient-to-br ${item.bgGradient} shadow-lg border border-white/50 backdrop-blur-sm relative overflow-hidden group cursor-pointer`}
                    >
                      {/* Hover glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl`} />

                      <div className={`relative p-2 sm:p-3 lg:p-4 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg flex-shrink-0`}>
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white drop-shadow-sm" />
                      </div>

                      <div className="relative flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base lg:text-lg xl:text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 mb-1 sm:mb-2 leading-tight">
                          {item.title}
                        </h4>
                        <div className="space-y-1">
                          {item.details.map((detail, i) => (
                            <p key={i} className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed break-words">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}