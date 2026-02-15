import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M21.8 4.2c.2-.8-.6-1.5-1.4-1.2L3.2 9.7c-.9.3-.8 1.6.1 1.8l4.6 1.4 1.7 5.2c.3.9 1.5 1 1.9.2l2.3-4 4.3 3.2c.7.5 1.8.1 2-.8l2.7-12.5zM9.1 12.3l8.8-5.5-7 6.6-.3 3.8-1.2-3.8-3.7-1.1 9.8-3.7-6.4 3.7z" />
  </svg>
);

export function Footer() {
  const { t } = useTranslation();
  // Smooth scroll to on-page sections
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <footer className="backdrop-blur-xl border-t border-black/5 bg-white/50 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand + Social */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
              <h3 className="text-2xl font-bold">LingUp</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('empowering')}
              </p>
              <div className="flex space-x-2">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61558507207895", label: "Facebook" },
                  { Icon: Youtube, href: "https://www.youtube.com/@LingUp", label: "YouTube" },
                  { Icon: Instagram, href: "https://www.instagram.com/lingup_with_bonu/", label: "Instagram" },
                  { Icon: TelegramIcon, href: "https://t.me/lingup_uz", label: "Telegram" },
                ].map(({ Icon, href, label }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Button variant="ghost" size="icon" className="text-black/60 hover:text-black">
                        <Icon className="w-5 h-5" />
                      </Button>
                    </a>
                ))}
              </div>
            </motion.div>

            {/* Courses */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
              <h4 className="font-medium text-black">{t("courses")}</h4>
              <ul className="space-y-2">
                {[
                  { label: "Start", id: "courses" },
                  { label: "Standart", id: "courses" },
                  { label: "Premium", id: "courses" },
                ].map((course, index) => (
                    <motion.li
                        key={course.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        viewport={{ once: true }}
                    >
                      <a
                          href={`#${course.id}`}
                          onClick={scrollTo(course.id)}
                          className="text-black/70 hover:text-black transition-colors duration-200"
                      >
                        {course.label}
                      </a>
                    </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company (updated per your request) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
              <h4 className="font-medium text-black">Menu</h4>
              <ul className="space-y-2">
                {[t("results"), t("reviews"), t("contact"), t("courses")].map((item, index) => (
                    <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                      <a
                          href={`#${item.toLowerCase()}`}
                          onClick={scrollTo(item.toLowerCase())}
                          className="text-black/70 hover:text-black transition-colors duration-200 cursor-pointer"
                      >
                        {item}
                      </a>
                    </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
              <h4 className="font-medium text-black">{t("contact_info")}</h4>
              <div className="space-y-3">
                <a
                    href="https://t.me/lingup_admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-black/70 hover:text-black transition-colors"
                >
                  <TelegramIcon className="w-4 h-4" />
                  <span>@admin_lingup</span>
                </a>
                <a
                    href="tel:+15551234567"
                    className="flex items-center space-x-3 text-black/70 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+998(90)499-50-00</span>
                </a>
                <a
                    href="https://maps.google.com/?q=123%20Education%20Street%2C%20Learning%20City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-black/70 hover:text-black transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Mirzo Ulug'bek tumani, Qorasuv 3, 4</span>
                </a>
              </div>
            </motion.div>
          </div>

          <Separator className="my-8 bg-black/10" />

          {/* Bottom row */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="text-black/60">
              <p>&copy; 2025 CodeCraft. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              {[
                { label: "Privacy Policy", id: "privacy" },
                { label: "Terms of Service", id: "terms" },
                { label: "Cookie Policy", id: "cookies" },
              ].map((p, index) => (
                  <motion.a
                      key={p.id}
                      href={`#${p.id}`}
                      onClick={scrollTo(p.id)}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      viewport={{ once: true }}
                      className="text-black/70 hover:text-black transition-colors duration-200"
                  >
                    {p.label}
                  </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
  );
}
