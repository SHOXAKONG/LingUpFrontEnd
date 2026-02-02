import { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Trophy,
  Users,
  Target,
  BookOpen,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import slides from "./figma/Slides";
import { Trans, useTranslation } from "react-i18next";

export function StudentResults() {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 4000 })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Open modal
  const openImage = (imgUrl: string) => setSelectedImage(imgUrl);
  // Close modal
  const closeImage = () => setSelectedImage(null);

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="results"
      className="relative w-full px-3 sm:px-5 py-12 sm:py-20 md:py-25 min-h-screen scroll-smooth"
    >
      {/* Decorative Elements */}
      <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-16 right-10 sm:top-32 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-10 left-16 sm:bottom-20 sm:left-32 w-8 h-8 sm:w-12 sm:h-12 bg-purple-400 rounded-full opacity-25 animate-pulse"></div>
      <div className="absolute bottom-20 right-5 sm:bottom-40 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 md:mb-16">
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-white/20">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {t("student_success_stories")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 leading-tight">
            <Trans
              i18nKey="outstanding_student"
              components={{
                highlight: (
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
                ),
              }}
            />
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
            {t("celebrating_our_studets_remarkable_journey")}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {[
            {
              icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />,
              value: "5500+",
              label: t("successful_students"),
              bg: "bg-blue-500",
            },
            {
              icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />,
              value: "95%",
              label: t("successful_rate"),
              bg: "bg-green-500",
            },
            {
              icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />,
              value: "150+",
              label: t("awards_won"),
              bg: "bg-purple-500",
            },
            {
              icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />,
              value: "25+",
              label: t("course_levels"),
              bg: "bg-orange-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 text-center hover:bg-white/90 hover:scale-[1.03] transition-all duration-300 shadow-md"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${item.bg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                {item.value}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="embla__slide flex-shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/3 p-1 sm:p-2"
              >
                <div
                  className={`snap-start flex-shrink-0 w-full
                              bg-white/60 backdrop-blur-sm
                              border border-white/30
                              rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:bg-white/70
                              transition-all duration-500 group overflow-hidden h-auto`}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6">
                    {/* Image */}
                    <div className="w-[140px] h-[180px] sm:w-[110px] sm:h-[140px] md:w-[130px] md:h-[170px] flex-shrink-0 overflow-hidden shadow-lg cursor-pointer rounded-xl mb-3 sm:mb-0">
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.name}
                        onClick={() => openImage(slide.image)}
                      />
                    </div>

                    {/* Text Section */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-snug mb-2 truncate">
                        {slide.name}
                      </h2>

                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 mb-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-bold px-3 sm:px-4 py-1.5 rounded-full shadow-sm">
                          {slide.course}
                        </div>
                        {slide.score && (
                          <div className="bg-green-100 text-green-700 text-sm sm:text-base font-semibold px-3 py-1.5 rounded-full">
                            {slide.score}
                          </div>
                        )}
                      </div>

                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed line-clamp-3">
                        {t(slide.description)}
                      </p>
                    </div>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-2 sm:left-4 md:left-0 md:-translate-x-1/2 
                    top-1/2 -translate-y-1/2 z-20
                    w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full
                    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                    text-white shadow-2xl hover:scale-105 active:scale-95
                    transition-transform"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 mx-auto" />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-2 sm:right-4 md:right-0 md:translate-x-1/2 
                    top-1/2 -translate-y-1/2 z-20
                    w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full
                    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                    text-white shadow-2xl hover:scale-105 active:scale-95
                    transition-transform"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 mx-auto" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 sm:mt-8 md:mt-12 space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-blue-600 w-4 sm:w-6 md:w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2"
          onClick={closeImage}
        >
          <div
            className="max-w-full max-h-full p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="Full view"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300"
              />
              <button
                onClick={closeImage}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-1.5 sm:p-2 rounded-full transition-all duration-300"
              >
                <span className="text-sm sm:text-base">✕</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
