import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Button from "./Button";

const navItems = ["Home", "Events", "Join Us", "Teams", "About Us"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false); // 👈 New state

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Closing: trigger exit animation
      setIsUnmounting(true);
      document.body.style.overflow = "";

      setTimeout(() => {
        setShowMenuItems(false);
        setIsMenuOpen(false);
        setIsUnmounting(false);
      }, 600); // 🔧 delay to wait for fall animation to finish (match animation duration)
    } else {
      // Opening
      setShowMenuItems(true);
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-3 top-4 z-50 h-16 border-none bg-black/20 backdrop-blur-md transition-all duration-700 sm:inset-x-5 rounded-lg"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <img src="/img/logo.png" alt="logo" className="w-[5rem]" />
            </div>

            <div className="hidden md:flex h-full items-center gap-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn text-xl lg:text-[1rem] font-bold"
                >
                  {item}
                </a>
              ))}

              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden text-blue-50"
            >
              {isMenuOpen ? (
                <IoMdClose size={30} className="text-white" />
              ) : (
                <GiHamburgerMenu size={30} />
              )}
            </button>
          </nav>
        </header>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={clsx(
          "fixed top-0 right-0 z-[999] h-screen w-full bg-black text-white px-10 py-20 transform transition-transform duration-500 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-8 right-3 text-white z-[1001]"
          aria-label="Close menu"
        >
          <IoMdClose size={36} />
        </button>

        {(showMenuItems || isUnmounting) && (
          <ul className="flex flex-col items-center space-y-10 mt-16">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={clsx(
                  "text-5xl font-bold text-blue-50 transition-opacity duration-500",
                  {
                    "opacity-100 animate-rise": showMenuItems && !isUnmounting,
                    "opacity-0 animate-fall": isUnmounting,
                  }
                )}
                style={{
                  animationDelay: `${0.1 * index + 0.3}s`,
                  animationFillMode: "both",
                }}
              >
                <a href={`#${item.toLowerCase()}`} onClick={toggleMenu}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="absolute bottom-32 left-0 right-0 px-10 flex items-center justify-between w-full">
          <p className="text-sm text-blue-50">BMSCE ACM STUDENT CHAPTER</p>
          <button onClick={toggleAudioIndicator} className="flex items-center space-x-1">
            <audio
              ref={audioElementRef}
              className="hidden"
              src="/audio/loop.mp3"
              loop
            />
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={clsx("indicator-line", {
                  active: isIndicatorActive,
                })}
                style={{
                  animationDelay: `${bar * 0.1}s`,
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
