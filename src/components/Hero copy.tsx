import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Play, Users, Award, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8" id=
    'hero'>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                // Increased text size for all screen sizes
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
              >
                {t('master_english')}
                <span className="text-primary"></span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                // Increased text size
                className="text-2xl text-muted-foreground leading-relaxed"
              >
                {t('transform_skills')}
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#courses">
              <Button size="lg" className="group px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                {t('start_learning')}
              </Button>
              </a>
              <a href='#contact'>
              <Button variant="outline" size="lg" className="px-8 py-3">
                {t('contact')}
              </Button>
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-4"
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <div className="text-3xl font-bold text-foreground">3,000+</div>
                </div>
                <div className="text-base text-muted-foreground">{t('students')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  <div className="text-3xl font-bold text-foreground">10+</div>
                </div>
                <div className="text-base text-muted-foreground">{t('years_of_experience')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  <div className="text-3xl font-bold text-foreground">6-8.5</div>
                </div>
                <div className="text-base text-muted-foreground">{t('ielts_results')}</div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ImageWithFallback
                src="/src/assets/03.png"
                alt="Students learning English online"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-lg shadow-lg p-4 border border-border hidden lg:block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                </div>
                <div>
                  {/* Increased text size */}
                  <div className="font-semibold text-lg text-foreground">Course Completed!</div>
                  <div className="text-base text-muted-foreground">Advanced English</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] max-w-[550px] max-h-[550px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-[45%_55%_60%_40%/35%_40%_60%_65%]"></div>