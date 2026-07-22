import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { SmoothScroll } from "./components/SmoothScroll.jsx";
import { CustomCursor } from "./components/CustomCursor.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Works } from "./components/Works.jsx";
import { About } from "./components/About.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";
import { FabTelegram } from "./components/FabTelegram.jsx";
import { Lightbox } from "./components/Lightbox.jsx";

export default function App() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <LanguageProvider>
      <SmoothScroll>
        <div className="grain" aria-hidden="true" />
        <CustomCursor />
        <Header />
        <main id="top">
          <Hero />
          <Works onOpenWork={setLightbox} />
          <About />
          <Contact />
        </main>
        <Footer />
        <FabTelegram />
        <Lightbox active={lightbox} onClose={() => setLightbox(null)} />
      </SmoothScroll>
    </LanguageProvider>
  );
}
