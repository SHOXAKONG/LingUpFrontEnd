import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Check, Clock, Users, BookOpen, X, Loader2, Star, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

/* ===== Types (match /api/skill* responses) ===== */
interface ApiPriceList {
  id: string;
  course?: string;
  course_ru?: string;
  course_uz?: string;
  description?: string;
  description_ru?: string;
  description_uz?: string;
  price: string;
  is_active: boolean;
  order?: number;
}

interface ApiSkillRow {
  id: string;
  name?: string;
  name_ru?: string;
  name_uz?: string;
  status: boolean;
  order?: number;
  price_list: ApiPriceList;
}

interface Feature { name: string; status: boolean; }
interface Course {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  duration: string;
  students: string;
  lessons: string;
  description: string;
  features: Feature[];
}

/* ===== Animation & Defaults ===== */
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  },
  card: {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring" as const, delay: index * 0.15, stiffness: 100 }
    })
  }
};

const DEFAULT_COURSE_STATS = { duration: "10 weeks", lessons: "40 lessons", students: "5000+" };

/* ===== Helpers ===== */
const pickLocalized = (obj: Record<string, any>, base: string, language: string) => {
  // Works for both language-specific endpoints (plain fields) and mixed *_ru/_uz payloads
  const lang = (language || "").toLowerCase();
  const key =
    lang.startsWith("ru") ? `${base}_ru` :
      lang.startsWith("uz") ? `${base}_uz` :
        base;
  return obj?.[base] ?? obj?.[key] ?? obj?.[base] ?? "";
};

const STATIC_ORIGINAL_PRICE_BY_ORDER: Record<number, number> = {
  1: 1180000,
  2: 1780000,
  3: 2580000,
};

const formatPrice = (price: string, order?: number): { current: string; original?: string } => {
  const n = Number(price);
  const current = `${Number.isFinite(n) ? n.toLocaleString() : price}sum`;
  const staticOriginal = typeof order === "number" ? STATIC_ORIGINAL_PRICE_BY_ORDER[order] : undefined;
  const original = typeof staticOriginal === "number" ? `${staticOriginal.toLocaleString()}sum` : undefined;
  return { current, original };
};

/* Build Course[] from /api/skill* rows */
const buildCoursesFromSkillApi = (rows: ApiSkillRow[], language: string): Course[] => {
  const active = rows.filter(r => r.price_list?.is_active);

  type Agg = {
    title: string; description: string; price: string; originalPrice?: string;
    courseOrder: number; featureMap: Map<string, { status: boolean; order: number }>;
  };
  const byCourse = new Map<string, Agg>();

  for (const r of active) {
    const cid = r.price_list.id;
    if (!byCourse.has(cid)) {
      const title = pickLocalized(r.price_list, "course", language) || "No Title";
      const description = pickLocalized(r.price_list, "description", language) || "No description available.";
      const { current: price, original: originalPrice } = formatPrice(r.price_list.price, Number(r.price_list.order));
      byCourse.set(cid, {
        title, description, price, originalPrice,
        courseOrder: Number.isFinite(Number(r.price_list.order)) ? Number(r.price_list.order) : 9999,
        featureMap: new Map()
      });
    }
    const agg = byCourse.get(cid)!;
    const fname = pickLocalized(r as any, "name", language) || r.name || r.name_ru || r.name_uz;
    if (!fname) continue;

    const prev = agg.featureMap.get(fname);
    const mergedStatus = prev ? (prev.status || r.status) : r.status;
    const ordCandidate = Number.isFinite(Number(r.order)) ? Number(r.order) : (prev?.order ?? 9999);
    agg.featureMap.set(fname, { status: mergedStatus, order: Math.min(ordCandidate, prev?.order ?? ordCandidate) });
  }

  return Array.from(byCourse.entries())
    .sort((a, b) => a[1].courseOrder - b[1].courseOrder)
    .map(([cid, agg]) => ({
      id: cid,
      title: agg.title,
      price: agg.price,
      originalPrice: agg.originalPrice,
      description: agg.description,
      features: Array.from(agg.featureMap.entries())
        .sort((a, b) => a[1].order - b[1].order)
        .map(([name, meta]) => ({ name, status: meta.status })),
      ...DEFAULT_COURSE_STATS
    }));
};

import type { ViewType } from "../App";

/* ===== UI Components (unchanged) ===== */
const SkillIcon = ({ status }: { status: boolean }) => {
  const Icon = status ? Check : X;
  const bgColor = status ? "bg-gradient-to-r from-emerald-500 to-green-500" : "bg-gradient-to-r from-red-500 to-rose-500";
  return (
    <motion.span className={`inline-flex aspect-square w-7.5 h-7.5 items-center justify-center rounded-full ${bgColor} shadow-lg`}
      whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
      <Icon className="w-4 h-4 text-white" />
    </motion.span>
  );
};

const SkillItem = ({ feature, index }: { feature: Feature; index: number }) => (
  <motion.li
    className="flex items-center gap-4 p-1 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300"
    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
    whileHover={{ x: 5, scale: 1.02 }}
  >
    <SkillIcon status={feature.status} />
    <span className={`text-base font-medium transition-colors ${feature.status ? "text-gray-800" : "text-red-500 line-through"}`}>
      {feature.name}
    </span>
  </motion.li>
);

const CourseCard = ({ course, index, setView }: { course: Course; index: number; setView: (view: ViewType) => void }) => {
  const { t } = useTranslation();
  const handleEnrollClick = () => setView("order");

  return (
    <motion.div
      custom={index} variants={ANIMATION_VARIANTS.card} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="h-full max-w-2xl w-full mx-auto" whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }}
    >
      <Card className="relative h-full flex flex-col bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 group min-h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        {index === 1 && (
          <div className="absolute -top-3 -right-5 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 rotate-22 transform">
              <Star className="w-4 h-4" /> {t("popular")}
            </div>
          </div>
        )}
        <CardHeader className="text-center pb-6 pt-8 relative z-10">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{course.title}</CardTitle>
          <div className="space-y-6">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{course.price}</span>
              {course.originalPrice && <span className="text-lg text-gray-400 line-through font-medium">{course.originalPrice}</span>}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className="flex gap-2 text-xs">
              <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-indigo-50">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-indigo-800">{course.duration}</span>
              </div>
              <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-purple-50">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">{course.lessons}</span>
              </div>
              <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-pink-50">
                <Users className="w-5 h-5 text-pink-600" />
                <span className="font-medium text-pink-800">{course.students} students</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow px-8 relative z-10">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
            <p className="text-center text-gray-700 text-base leading-relaxed font-medium">{course.description}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h4 className="text-lg font-semibold text-gray-800">Course Features</h4>
            </div>
            <ul className="space-y-1">
              {course.features.map((feature, idx) => <SkillItem key={idx} feature={feature} index={idx} />)}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="pt-6 pb-8 px-8 relative z-10">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
            <Button
              onClick={handleEnrollClick}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl border-0 relative overflow-hidden group"
            >
              <span className="relative z-10">{t("enroll_now")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const LoadingState = () => (
  <div className="flex items-center justify-center py-32">
    <div className="text-center space-y-6">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mx-auto" />
        <div className="absolute inset-0 w-12 h-12 border-4 border-purple-200 rounded-full animate-pulse mx-auto" />
      </div>
      <div className="space-y-2">
        <p className="text-xl font-semibold text-gray-800">Loading courses...</p>
        <p className="text-gray-600">Please wait while we fetch the latest course information</p>
      </div>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center py-32">
    <div className="text-center space-y-6 max-w-lg">
      <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto">
        <X className="w-10 h-10 text-red-500" />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">Failed to load courses</h3>
        <p className="text-gray-600 text-lg">{message}</p>
        <p className="text-sm text-gray-500">Please check your internet connection and try again</p>
      </div>
    </div>
  </div>
);

/* ===== Main Component ===== */
export function Courses({ setView }: { setView: (view: ViewType) => void }) {
  const { i18n, t } = useTranslation();

  // Choose endpoint per language (handles 'ru', 'ru-RU', 'uz', 'uz-UZ', etc.)
  const getSkillEndpoint = useCallback(() => {
    const lang = (i18n.language || "").toLowerCase();
    if (lang.startsWith("uz")) return "https://api.lingup.uz/api/skill/skill_uz/";
    if (lang.startsWith("ru")) return "https://api.lingup.uz/api/skill/skill_ru/";
    return "https://api.lingup.uz/api/skill/"; // default (EN)
  }, [i18n.language]);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    const url = getSkillEndpoint();
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get<ApiSkillRow[]>(url, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
        withCredentials: false
      });

      const built = buildCoursesFromSkillApi(data, i18n.language);
      setCourses(built);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? (err.response?.data as any)?.detail || err.message || "Failed to fetch courses"
        : err instanceof Error
          ? err.message
          : "An unexpected error occurred";
      setError(errorMessage);
      console.error("❌ Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  }, [getSkillEndpoint, i18n.language]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]); // re-fetch when language changes

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (courses.length === 0) return null;

  return (
    <section id="courses" className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold leading-[1.1] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {t("choose_path")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("choose_path_description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} setView={setView} />
          ))}
        </div>
      </div>
    </section>
  );
}
