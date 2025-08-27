import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

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
                  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61558797356892", label: "Facebook" },
                  { Icon: Twitter, href: "https://twitter.com/yourhandle", label: "Twitter" },
                  { Icon: Instagram, href: "https://www.instagram.com/lingup_uz/", label: "Instagram" },
                  { Icon: Linkedin, href: "https://linkedin.com/company/yourcompany", label: "LinkedIn" },
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
                    href="mailto:support@lingup.com"
                    className="flex items-center space-x-3 text-black/70 hover:text-black transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>support@lingup.com</span>
                </a>
                <a
                    href="tel:+15551234567"
                    className="flex items-center space-x-3 text-black/70 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a
                    href="https://maps.google.com/?q=123%20Education%20Street%2C%20Learning%20City"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-black/70 hover:text-black transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>123 Education Street, Learning City</span>
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
              <p>&copy; 2025 LingUp. All rights reserved.</p>
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
