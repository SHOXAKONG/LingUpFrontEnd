import { Users, Award, BookOpen } from 'lucide-react';


import { useTranslation } from "react-i18next";



const StatsSection = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full relative py-16 overflow-hidden'>
      {/* Universal animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900">
        {/* Desktop floating geometric shapes */}
        <div className="hidden lg:block absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="hidden lg:block absolute top-40 right-20 w-20 h-20 bg-pink-500/15 transform rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="hidden lg:block absolute bottom-20 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="hidden lg:block absolute bottom-40 right-1/3 w-24 h-24 bg-indigo-500/10 transform rotate-12 animate-pulse" style={{ animationDuration: '5s' }}></div>

        {/* Mobile floating geometric shapes - smaller and repositioned */}
        <div className="lg:hidden absolute top-4 left-4 w-8 h-8 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="lg:hidden absolute top-12 right-6 w-6 h-6 bg-pink-500/15 transform rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="lg:hidden absolute bottom-8 left-8 w-4 h-4 bg-purple-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="lg:hidden absolute bottom-16 right-12 w-6 h-6 bg-indigo-500/10 transform rotate-12 animate-pulse" style={{ animationDuration: '5s' }}></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse" style={{ animationDuration: '8s' }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Subtle wave animation */}
        <div className="absolute bottom-0 left-0 w-full h-full opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.1 }} />
                <stop offset="50%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M0,70 Q25,50 50,70 T100,70 L100,100 L0,100 Z" fill="url(#waveGradient)" className="animate-pulse" style={{ animationDuration: '6s' }} />
          </svg>
        </div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6">
        {/* Desktop layout - unchanged */}
        <div className="hidden lg:flex items-center justify-center gap-15">

          {/* Desktop Students Stat */}
          <div className="relative group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 w-1/3 h-70">
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all duration-500 backdrop-blur-sm border border-white/10 overflow-hidden w-full h-full">

              {/* Simplified animated background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
              </div>

              {/* Minimal floating elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 right-6 w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-3 left-3 w-8 h-8 border-2 border-white/20 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <Users className="h-8 w-8 text-white drop-shadow-lg transition-all duration-300" />
                </div>

                <div className="mb-3 relative">
                  <span className="text-3xl lg:text-4xl font-black text-white drop-shadow-lg tracking-tight group-hover:scale-105 transition-transform duration-300 inline-block">
                    3,000+
                  </span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                </div>

                <p className="text-white/90 text-lg font-bold uppercase tracking-wider group-hover:text-white transition-colors duration-300 mb-4">
                  {t("STUDENTS")}
                </p>

                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                  <div className="w-8 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Desktop Experience Stat */}
          <div className="relative group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 w-1/3 h-70">
            <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 rounded-2xl shadow-xl hover:shadow-green-500/25 transition-all duration-500 backdrop-blur-sm border border-white/10 overflow-hidden w-full h-full">

              {/* Grid pattern background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}></div>
              </div>

              {/* Rotating element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-10 border-2 border-white/15 rounded-full animate-spin" style={{ animationDuration: '12s' }}></div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-white/25 transform rotate-45 group-hover:rotate-180 transition-transform duration-700"></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <Award className="h-8 w-8 text-white drop-shadow-lg transition-all duration-300" />
                </div>

                <div className="mb-3 relative">
                  <span className="text-3xl lg:text-4xl font-black text-white drop-shadow-lg tracking-tight group-hover:scale-105 transition-transform duration-300 inline-block">
                    17+
                  </span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                </div>

                <p className="text-white/90 text-lg font-bold uppercase tracking-wider group-hover:text-white transition-colors duration-300 mb-4">
                  {t("YEARS_OF_EXPERIENCE")}
                </p>

                <div className="flex justify-center items-center space-x-2">
                  <div className="w-3 h-1 bg-white/60 rounded-full group-hover:w-5 transition-all duration-400"></div>
                  <div className="w-5 h-1 bg-white/80 rounded-full group-hover:w-7 transition-all duration-400"></div>
                  <div className="w-3 h-1 bg-white/60 rounded-full group-hover:w-5 transition-all duration-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop IELTS Results Stat */}
          <div className="relative group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 w-1/3 h-70">
            <div className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-red-700 p-8 rounded-2xl shadow-xl hover:shadow-rose-500/25 transition-all duration-500 backdrop-blur-sm border border-white/10 overflow-hidden w-full h-full">

              {/* Wave pattern */}
              <div className="absolute inset-0 opacity-15">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z" fill="white" opacity="0.1" className="group-hover:animate-pulse" />
                  <path d="M0,70 Q25,50 50,70 T100,70 L100,100 L0,100 Z" fill="white" opacity="0.05" className="group-hover:animate-pulse" style={{ animationDelay: '1s' }} />
                </svg>
              </div>

              {/* Decorative shapes */}
              <div className="absolute top-4 left-4">
                <div className="w-6 h-6 bg-white/20 transform rotate-45 group-hover:rotate-90 transition-transform duration-500" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
              </div>

              {/* Floating symbols */}
              <div className="absolute top-6 right-4 text-white/25 text-sm font-bold transform group-hover:scale-110 transition-transform duration-400">★</div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <BookOpen className="h-8 w-8 text-white drop-shadow-lg transition-all duration-300" />
                </div>

                <div className="mb-3 relative">
                  <span className="text-3xl lg:text-4xl font-black text-white drop-shadow-lg tracking-tight group-hover:scale-105 transition-transform duration-300 inline-block">
                    6.0–8.5
                  </span>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>

                <p className="text-white/90 text-lg font-bold uppercase tracking-wider group-hover:text-white transition-colors duration-300 mb-4">
                  {t("IELTS_RESULTS")}
                </p>

                <div className="flex justify-center space-x-1">
                  <div className="w-1 h-6 bg-white/40 rounded-full group-hover:h-8 group-hover:bg-white/70 transition-all duration-300"></div>
                  <div className="w-1 h-4 bg-white/50 rounded-full group-hover:h-6 group-hover:bg-white/80 transition-all duration-300" style={{ transitionDelay: '50ms' }}></div>
                  <div className="w-1 h-8 bg-white/60 rounded-full group-hover:h-10 group-hover:bg-white/90 transition-all duration-300" style={{ transitionDelay: '100ms' }}></div>
                  <div className="w-1 h-5 bg-white/50 rounded-full group-hover:h-7 group-hover:bg-white/80 transition-all duration-300" style={{ transitionDelay: '150ms' }}></div>
                  <div className="w-1 h-3 bg-white/40 rounded-full group-hover:h-5 group-hover:bg-white/70 transition-all duration-300" style={{ transitionDelay: '200ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout - vertical stack */}
        <div className="lg:hidden flex flex-col space-y-6">

          {/* Mobile Students Stat */}
          <div className="relative group cursor-pointer transition-all duration-500 hover:scale-102 w-full">
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/10 overflow-hidden">

              {/* Simplified mobile background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
              </div>

              {/* Mobile floating elements */}
              <div className="absolute inset-0">
                <div className="absolute top-3 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
              </div>

              <div className="relative z-10 flex items-center space-x-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex-shrink-0">
                  <Users className="h-6 w-6 text-white drop-shadow-lg" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg tracking-tight">
                      3,000+
                    </span>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-bold uppercase tracking-wider">
                    Students
                  </p>
                </div>

                <div className="flex space-x-1 flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                  <div className="w-6 h-1.5 bg-white/70 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Experience Stat */}
          <div className="relative group cursor-pointer transition-all duration-500 hover:scale-102 w-full">
            <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/10 overflow-hidden">

              {/* Mobile grid pattern */}
              <div className="absolute inset-0 opacity-15">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                  backgroundSize: '12px 12px'
                }}></div>
              </div>

              <div className="absolute top-3 right-3 w-3 h-3 bg-white/25 transform rotate-45"></div>

              <div className="relative z-10 flex items-center space-x-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex-shrink-0">
                  <Award className="h-6 w-6 text-white drop-shadow-lg" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg tracking-tight">
                      17+
                    </span>
                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-bold uppercase tracking-wider">
                    Years Experience
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <div className="w-2 h-0.5 bg-white/60 rounded-full"></div>
                  <div className="w-3 h-0.5 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-0.5 bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile IELTS Results Stat */}
          <div className="relative group cursor-pointer transition-all duration-500 hover:scale-102 w-full">
            <div className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-red-700 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/10 overflow-hidden">

              {/* Mobile wave pattern */}
              <div className="absolute inset-0 opacity-15">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z" fill="white" opacity="0.1" />
                </svg>
              </div>

              <div className="absolute top-3 left-3">
                <div className="w-4 h-4 bg-white/20 transform rotate-45" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
              </div>

              <div className="absolute top-4 right-3 text-white/25 text-xs font-bold">★</div>

              <div className="relative z-10 flex items-center space-x-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-white drop-shadow-lg" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg tracking-tight">
                      6–8.5
                    </span>
                    <div className="w-4 h-0.5 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-bold uppercase tracking-wider">
                    IELTS Results
                  </p>
                </div>

                <div className="flex space-x-0.5 flex-shrink-0">
                  <div className="w-0.5 h-4 bg-white/40 rounded-full"></div>
                  <div className="w-0.5 h-3 bg-white/50 rounded-full"></div>
                  <div className="w-0.5 h-6 bg-white/60 rounded-full"></div>
                  <div className="w-0.5 h-4 bg-white/50 rounded-full"></div>
                  <div className="w-0.5 h-2 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;