import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { ViewType } from "../App";

const LANGUAGES = [
  { code: "uz", label: "O'zbek" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

const NAV_ITEMS = [
  { label: "Results", id: "results" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
  { label: "Courses", id: "courses" },
];

export function Header({ setView }: { setView: (view: ViewType) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== "uz") {
      i18n.changeLanguage("uz");
    }
  }, [i18n]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const navigateToSection = (id: string) => {
    const scrollToTarget = () => {
      const section = document.getElementById(id);
      if (!section) {
        return false;
      }
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    setIsMenuOpen(false);

    if (scrollToTarget()) {
      return;
    }

    setView("landing");

    let attempts = 0;
    const maxAttempts = 40;
    const tryScroll = () => {
      if (scrollToTarget()) {
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        window.requestAnimationFrame(tryScroll);
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.requestAnimationFrame(tryScroll);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl sticky top-0 z-50 w-full border-b border-black/5 bg-white/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
          >
            <button
              onClick={() => {
                navigateToSection("hero");
              }}
              className="text-2xl font-bold text-black cursor-pointer bg-transparent border-none"
            >
              LingUp
            </button>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                onClick={() => navigateToSection(item.id)}
                className="text-black/70 hover:text-black transition-colors duration-200 cursor-pointer bg-transparent border-none"
              >
                {t(item.id)}
              </motion.button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Switch */}
            <select
              onChange={handleLanguageChange}
              value={i18n.language}
              className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              {LANGUAGES.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className="bg-white text-black"
                >
                  {lang.label}
                </option>
              ))}
            </select>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:block"
            >
              <Button
                onClick={() => navigateToSection("courses")}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none hover:shadow-lg transition-all duration-200"
              >
                {t("start_learning")}
              </Button>
            </motion.div>

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-black hover:bg-black/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pb-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 mt-2 px-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    onClick={() => {
                      navigateToSection(item.id);
                    }}
                    className="text-black/70 hover:text-black transition-colors duration-200 text-left bg-transparent border-none cursor-pointer"
                  >
                    {t(item.id)}
                  </motion.button>
                ))}

                <Button
                  onClick={() => {
                    navigateToSection("courses");
                  }}
                  className="w-full mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none hover:shadow-lg transition-all duration-200"
                >
                  {t("start_learning")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
