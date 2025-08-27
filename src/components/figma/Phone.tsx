import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const Phone = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleWindow = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-end gap-4 relative z-[80] pointer-events-auto">
      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-[64px] h-[64px] rounded-full grid place-items-center text-2xl
                   bg-gradient-to-br from-indigo-600 to-purple-600 text-white
                   shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      {/* Phone + Window */}
      <div className="relative group md:[&>*:last-child]:pointer-events-none md:hover:[&>*:last-child]:pointer-events-auto">
        {/* Phone button */}
        <div
          onClick={toggleWindow}
          className="w-[64px] h-[64px] rounded-full grid place-items-center text-2xl
                     bg-gradient-to-br from-green-500 to-emerald-600 text-white
                     shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <FontAwesomeIcon icon={faPhone} />
        </div>

        {/* Window */}
        <div
          className={`
            absolute bottom-[78px] right-0 w-72
            rounded-2xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl
            p-5 text-gray-800 origin-bottom-right
            transition-all duration-300 ease-out

            /* Desktop hover behavior */
            md:opacity-0 md:scale-95 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:translate-y-0

            /* Mobile click behavior */
            ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"}
          `}
        >
          <h3 className="font-semibold text-lg mb-3">{t("contact")}</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="tel:+123456789"
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-emerald-50/70"
              >
                <span className="w-8 h-8 grid place-items-center rounded-full bg-emerald-100">
                  <FontAwesomeIcon icon={faPhone} className="text-emerald-600" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{t("call_us")}</span>
                  <span className="text-xs text-gray-500">+1 234 567 89</span>
                </div>
              </a>
            </li>

            <li>
              <a
                href="mailto:info@example.com"
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-indigo-50/70"
              >
                <span className="w-8 h-8 grid place-items-center rounded-full bg-indigo-100">
                  <FontAwesomeIcon icon={faEnvelope} className="text-indigo-600" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-xs text-gray-500">info@example.com</span>
                </div>
              </a>
            </li>

            <li>
              <a
                href="https://t.me/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-sky-50/70"
              >
                <span className="w-8 h-8 grid place-items-center rounded-full bg-sky-100">
                  <FontAwesomeIcon icon={faTelegram} className="text-sky-600" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Telegram</span>
                  <span className="text-xs text-gray-500">@your_username</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Phone;