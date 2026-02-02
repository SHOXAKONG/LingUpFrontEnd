// Reviews.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Card, CardContent } from "./ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

/** Load avatars from src/assets/comments */
const avatarModules = import.meta.glob("../assets/comments/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;


/** Extract the “Image N” index from filename. */
function getImageIndexFromPath(p: string): number {
  const file = p.split("/").pop() ?? p;
  const mExact = file.match(/image[_\s-]?(\d+)/i); // “Image 11 - …”
  if (mExact) return parseInt(mExact[1], 10);
  const mFirst = file.match(/\d+/); // fallback
  return mFirst ? parseInt(mFirst[0], 10) : 0;
}

/** Map Image N → name & age */
const PEOPLE_META_MAP: Record<number, { name: string; age: string }> = {
  1: { name: "Abdumajidov Sodiqjon", age: "19 yosh" },
  2: { name: "Shavkatova Sevinch", age: "18 yosh" },
  3: { name: "Sultonova Zebo", age: "20 yosh" },
  4: { name: "Амириддинова Наргиза", age: "16 ёш" },
  5: { name: "Firuz", age: "26 yosh" },
  6: { name: "Ниязов Алихан", age: "18 ёш" },
  7: { name: "Kamalov Khusan", age: "23 yosh" },
  8: { name: "Garapshina Diana", age: "16 yosh" },
  9: { name: "Avazov Yusuf", age: "20 yosh" },
  10: { name: "Akhmedova Malika", age: "22 yosh" },
  11: { name: "Abdumannopova Malika", age: "16 yosh" },
};

/** Get avatars with their image index & sort */
const AVATARS_WITH_INDEX = Object.entries(avatarModules)
  .map(([path, url]) => ({ idx: getImageIndexFromPath(path), url }))
  .sort((a, b) => a.idx - b.idx);

type Review = {
  id: number;
  name: string;
  country: string; // we use this for age
  rating: number;
  review: string;
  course: string;
  avatar?: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    // Inside ReviewCard
    <Card className="card bg-white rounded-3xl shadow-xl border border-black/10 m-2 h-full">
      <CardContent className="p-6 md:p-7 lg:p-8 space-y-4 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={r.avatar}
              alt={r.name}
              className="w-12 h-12 rounded-full object-cover border border-black/10"
              loading="lazy"
            />
            <div className="min-w-0">
              <h4 className="text-lg font-semibold text-black truncate">{r.name}</h4>
              <p className="text-sm text-black/60 truncate">{r.country}</p>
            </div>
          </div>
          <StarRating rating={r.rating} />
        </div>

        {/* Body */}
        <blockquote className="text-black/70 leading-relaxed text-sm md:text-base flex-grow">
          “{r.review}”
        </blockquote>

        {/* Footer */}
        <div className="pt-3 border-t border-black/10">
          <span className="text-indigo-600 font-medium text-sm">{r.course}</span>
        </div>
      </CardContent>
    </Card>

  );
}

/* ===== Big gradient arrows ===== */
function PrevArrow(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <button
      type="button"
      aria-label="Previous"
      onClick={onClick}
      className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20
                 w-10 h-10 md:w-15 md:h-15 rounded-full
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 text-white shadow-2xl hover:scale-105 active:scale-95
                 transition-transform"
    >
      <ChevronLeft className="mx-auto w-7 h-7 md:w-8 md:h-8" />
    </button>
  );
}

function NextArrow(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <button
      type="button"
      aria-label="Next"
      onClick={onClick}
      className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-20
                 w-10 h-10 md:w-15 md:h-15 rounded-full
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 text-white shadow-2xl hover:scale-105 active:scale-95
                 transition-transform"
    >
      <ChevronRight className="mx-auto w-7 h-7 md:w-8 md:h-8" />
    </button>
  );
}

export function Reviews() {
  const { t, i18n } = useTranslation();

  const genericTexts = useMemo(() => {
    const texts = t("review_texts", { returnObjects: true });
    if (Array.isArray(texts) && texts.length > 0) {
      return texts as string[];
    }
    if (typeof texts === "string" && (texts as string).trim()) {
      return [texts as string];
    }
    return ["Classes are interactive and interesting. My speaking improved quickly."];
  }, [t, i18n.language]);

  /** Build reviews from image index → meta mapping */
  const people: Review[] = useMemo(() => {
    const tags = [
      "Begginer",
      "Intermediate",
      "Upper Intermediate",
      "IELTS Preparation",
      "TOEFL Preparation",
      "Advanced",
    ];

    return AVATARS_WITH_INDEX.map(({ idx, url }, i) => {
      const meta = PEOPLE_META_MAP[idx] ?? { name: "Unknown", age: "" };
      return {
        id: i + 1,
        name: meta.name,
        country: meta.age,
        rating: 5,
        review: genericTexts[i % genericTexts.length],
        course: tags[i % tags.length],
        avatar: url,
      };
    });
  }, [genericTexts]);

  /** Duplicate to make full slides of 6 (2 rows × 3) */
  const reviews: Review[] = useMemo(() => {
    const pool = [...people, ...people].slice(0, 12);
    return pool.map((r, i) => ({ ...r, id: i + 1 }));
  }, [people]);

  /** Chunk into groups of 6 for the slider */
  const slides: Review[][] = useMemo(() => {
    const out: Review[][] = [];
    for (let i = 0; i < reviews.length; i += 6) out.push(reviews.slice(i, i + 6));
    return out;
  }, [reviews]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  } as const;

  return (
    <section id="reviews" className="relative py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <div className="flex items-center justify-center gap-3 text-black/70">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="font-semibold">4.9/5</span>
          <span className="text-black/60">2,847 ta fikr asosida</span>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-7.5xl mx-auto relative m-5">
        <Slider {...settings}>
          {slides.map((group, idx) => (
            <div key={idx}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 py-6">
                {group.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                  >
                    <ReviewCard r={r} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
