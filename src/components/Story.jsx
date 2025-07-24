import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

import { ConfettiSideCannons } from "./ConfettiSideCannons"; // <-- Add this line

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 600,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      
      <div className="flex size-full flex-col items-center py-10 pb-24">


        <div className="relative size-full">
          <AnimatedTitle
            title="emerging chapter<br />award-2024"
            containerClass="mt-[200px] pointer-events-none mix-blend-difference relative z-10"
          />


          <div className="story-img-container ">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain w-[90vw] "
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex w-full justify-center md:justify-center  mt-[-18rem] md:mt-[-18rem] lg:mt-[-30rem] ">
          <div className="flex h-full w-fit flex-col items-center text-center md:items-center md:text-center ">
            <p className="mt-1 max-w-xs text-sm font-circular-web text-violet-50 sm:max-w-sm sm:text-base md:max-w-md lg:max-w-2xl">
              BMSCE ACM Student Chapter received the Emerging Chapter Award 2024 at the ACM India Annual Event 2025, presented by ACM President Yannis Ioannidis and Jury Chair Mini Ulanat.
            </p>
            <ConfettiSideCannons />


          </div>
        </div>

      </div>
    </div>
  );
};

export default FloatingImage;