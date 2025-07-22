import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Glance from "./components/Glance";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const comp = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.from("#intro-slider", {
        scale: 1,
        duration: 1,
        ease: "power3.out",
        backgroundColor: "#000000",
      })
        .to("#intro-slider", {
          duration: 1.3,
          ease: "power3.inOut",
          backgroundColor: "#000000ff",
        })
        .fromTo(
          "#title-1",
          { x: "-100vw", opacity: 1 },
          { x: "0", duration: 0.5, ease: "power4.out" }
        )
        .fromTo(
          "#title-2",
          { x: "100vw", opacity: 1 },
          { x: "0", duration: 0.5, ease: "power4.out" }
        )
        .fromTo(
          "#title-3",
          { x: "-100vw", opacity: 1 },
          { x: "0", duration: 0.5, ease: "power4.out" }
        )
        .fromTo(
          "#title-4",
          { x: "100vw", opacity: 1 },
          { x: "0", duration: 0.5, ease: "power4.out" }
        )
        // Zoom out and fade away
        .to(
          "#title-1",
          { scale: 4, opacity: 0, duration: 0.6, ease: "power4.in" },
          "+=0.5"
        )
        .to(
          "#title-2",
          { scale: 4, opacity: 0, duration: 0.6, ease: "power4.in" },
          "-=0.5"
        )
        .to(
          "#title-3",
          { scale: 4, opacity: 0, duration: 0.6, ease: "power4.in" },
          "-=0.4"
        )
        .to(
          "#title-4",
          { scale: 4, opacity: 0, duration: 0.6, ease: "power4.in" },
          "-=0.4"
        )
        .to("#intro-slider", {
          scale: 0,
          backgroundColor: "#000000ff",
          duration: 0.5,
          opacity: 0,
          ease: "power1.inOut",
           onComplete: () => {
    setShowContent(true);
    const introSlider = document.getElementById("intro-slider");
    if (introSlider) introSlider.style.display = "none"; // 👈 Hides the blocking element
  },
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={comp} className="relative min-h-screen w-screen overflow-x-hidden">
      <div
        id="intro-slider"
        className="h-screen p-10 bg-black font-extrabold space-y-10 text-blue-100 absolute top-0 left-0 font-spaceGrotesk z-[90] w-full flex flex-col justify-center items-center tracking-tight"
      >
        <h1 className="special-font text-4xl md:text-8xl hero-heading z-40" id="title-1">
          WELCOME
        </h1>
        <h1 className="special-font text-4xl md:text-6xl hero-heading uppercase" id="title-2">
          to
        </h1>
        <h1 className="special-font text-4xl md:text-8xl hero-heading uppercase text-blue-300" id="title-3">
          BMSCE ACM
        </h1>
        <h1 className="special-font text-4xl md:text-8xl hero-heading uppercase text-blue-300" id="title-4">
          Student Chapter
        </h1>
      </div>

      {showContent && (
        <>
          <NavBar />
          <Hero />
          <About />
          <Features />
          <Glance />
          <Story />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;
