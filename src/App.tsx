import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Hero } from "./components/Hero";
import { Courses } from "./components/Courses";
import { StudentResults } from "./components/StudentResults";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Stats from './components/figma/Stats'
import { OrderPage } from "./components/OrderPage";
import { SuccessPage } from "./components/SuccessPage";

export type ViewType = 'landing' | 'order' | 'success';

export default function App() {
  const [view, setView] = useState<ViewType>('landing');

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-indigo-50 to-purple-100 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-white/0 to-transparent"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-100/30 via-white/0 to-transparent"></div>

        <div className="fixed top-0 left-0 w-full z-50">
          <Header setView={setView} />
        </div>

        <main className="relative z-10">
          {view === 'landing' ? (
            <>
              <Hero />
              <Stats />
              <StudentResults />
              <Reviews />
              <Contact />
              <Courses setView={setView} />
            </>
          ) : view === 'order' ? (
            <OrderPage setView={setView} />
          ) : (
            <SuccessPage setView={setView} />
          )}
        </main>

        {/* <div className="fixed bottom-5 right-5 z-40"><Phone /></div> */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
