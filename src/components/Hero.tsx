import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Img03 from "@/assets/03.webp";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";

// Animation variants for better organization and reusability
const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerChildVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

// Mock button
const Button: React.FC<{
  size?: string;
  variant?: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}> = ({ size, variant, className, children, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  const sizeClasses =
    size === "lg" ? "h-11 px-8 text-base" : "h-10 px-4 py-2";
  const variantClasses =
    variant === "outline"
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-[125vh] md:min-h-screen w-full overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 15% 85%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #fefefe 0%, #f8fafc 50%, #f1f5f9 100%)
        `,
      }}
      aria-label="Hero section with introduction to LingUp platform"
    >
      {/* Primary Blob */}
      <motion.div
        className="absolute z-5 rounded-[45%_55%_60%_40%/35%_40%_60%_65%]
                  bg-gradient-to-br from-purple-400/60 via-pink-400/50 to-orange-300/40 
                  shadow-[0_0_120px_rgba(139,92,246,0.25)]
                  h-[280px] w-[280px] top-20 right-1/2 translate-x-1/2
                  sm:h-[320px] sm:w-[320px]
                  md:h-[380px] md:w-[380px] md:top-24 md:right-1/4 md:translate-x-1/4
                  lg:h-[450px] lg:w-[450px] lg:top-1/4 lg:right-1/6 lg:translate-x-0
                  xl:h-[500px] xl:w-[500px] xl:right-1/5
                  2xl:h-[550px] 2xl:w-[550px]"
        animate={{
          rotate: [0, 120, 240, 360],
          scale: [1, 1.08, 0.95, 1],
          borderRadius: [
            "45% 55% 60% 40% / 35% 40% 60% 65%",
            "60% 40% 45% 55% / 65% 35% 40% 60%",
            "55% 45% 35% 65% / 40% 60% 35% 65%",
            "45% 55% 60% 40% / 35% 40% 60% 65%",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary Blob */}
      <motion.div
        className="absolute z-5 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/20
                  h-[120px] w-[120px] right-8 top-32
                  md:h-[150px] md:w-[150px] md:right-12 md:top-40
                  lg:h-[180px] lg:w-[180px] lg:right-20 lg:top-20"
        animate={{
          scale: [1, 1.3, 0.8, 1],
          opacity: [0.3, 0.6, 0.2, 0.3],
          x: [0, 15, -15, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className={`
          relative z-20 order-2 w-full flex items-center justify-center
          px-4 py-4 mt-16 sm:mt-20 md:mt-0
          md:absolute md:inset-y-0 md:w-auto md:top-0
          md:flex md:items-center md:justify-center md:right-0
          lg:right-5 xl:right-5 2xl:right-48
        `}
      >
        <ImageWithFallback
          src={Img03}
          alt="Portrait of Shahribonu"
          className="object-cover rounded-2xl shadow-2xl
                     transition-all duration-500
                     w-[270px] max-w-[95%] max-h-[55vh]
                     sm:w-[270px] sm:max-h-[55vh]
                     md:w-auto md:max-h-[70vh]
                     lg:max-h-[75vh] xl:max-h-[80vh]
                     border-4 border-white/80 mx-auto"
        />
      </motion.div>

      {/* Text Section */}
      <div className="absolute flex items-center min-w-screen z-30">
        <div className="w-full">
          <div className="container mx-auto max-w-7xl lg:mt-5 md:mt-30 px-4 sm:px-6 lg:px-8 xl:px-12 xl:py-40 md:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Text column */}
              <div className="lg:col-span-7 xl:col-span-8 text-center md:text-left lg:pr-8 lg:flex lg:flex-col lg:justify-center xl:pr-12">
                {/* Title */}
                <motion.h1
                  variants={fadeInUpVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700
                            bg-clip-text font-black text-transparent mb-4
                            text-4xl leading-tight
                            sm:text-5xl sm:leading-tight
                            md:text-6xl md:leading-snug
                            lg:text-7xl lg:leading-snug
                            xl:text-8xl xl:leading-snug
                            2xl:text-9xl 2xl:leading-snug"
                >
                  LingUp
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  variants={staggerChildVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="font-semibold text-gray-800 mb-8
                             text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
                >
                  {t("master_english")}
                </motion.p>

                {/* ✅ Intro Box (pushed down on iPad) */}
                <motion.div
                  variants={fadeInUpVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="rounded-2xl border border-white/60 bg-white/90 backdrop-blur-lg shadow-xl
                             leading-relaxed text-gray-700 hover:shadow-2xl
                             transition-all duration-300 mb-8
                             mx-auto max-w-lg p-5 text-sm
                             sm:max-w-xl sm:p-6 sm:text-base
                             md:mx-0 md:max-w-lg md:text-sm md:mb-10
                             lg:max-w-none lg:p-7 lg:text-sm lg:mb-12 lg:mt-0
                             xl:p-8 xl:text-lg 2xl:text-xl"
                >
                  <p className="mb-4">
                    {t("I")},{" "}
                    <strong className="font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Shahribonu Shavkatovna
                    </strong>
                    , {t("hero1")}
                  </p>
                  <p className="mb-4">{t("hero2")}</p>
                  <p>{t("hero3")}</p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  variants={fadeInUpVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="flex gap-4 flex-col md:flex-row lg:gap-6"
                >
                  <motion.a href="#courses">
                    <Button
                      size="lg"
                      className="flex items-center gap-2 rounded-full shadow-xl
                                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
                                 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
                                 w-full sm:w-auto px-6 py-4 sm:px-8 lg:px-10 xl:px-12"
                    >
                      {t("start_learning")}
                      <ArrowUpRight className="h-5 w-5 lg:h-6 lg:w-6" />
                    </Button>
                  </motion.a>
                  <motion.a href="#contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex items-center gap-2 rounded-full shadow-xl
                                 bg-white/95 border-2 border-gray-300
                                 hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700
                                 w-full sm:w-auto px-6 py-4 sm:px-8 lg:px-10 xl:px-12"
                    >
                      {t("contact")}
                      <ArrowUpRight className="h-5 w-5 lg:h-6 lg:w-6" />
                    </Button>
                  </motion.a>
                </motion.div>
              </div>

              {/* Spacer for image on desktop */}
              <div className="hidden lg:col-span-5 xl:col-span-4 lg:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for readability on mobile */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white/40 md:bg-none" />
    </section>
  );
}

export default Hero;
