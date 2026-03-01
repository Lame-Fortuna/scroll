"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(containerRef);

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        // 1. INITIAL LOAD (Strictly ONLY Welcome & Name visible)
        const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        loadTl
          .fromTo(
            ".headline-text",
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15 }
          )
          .fromTo(
            ".shape-item",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.8, duration: 2, stagger: 0.2, ease: "power2.out" },
            "-=0.8"
          );

        // 2. SCROLL SEQUENCE (Scroll down to reveal the rest)
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom", // Scrubs through the 300vh height
            scrub: 1, 
          },
        });

        // Push headlines up and fade them out
        scrollTl
          .to(".headline-container", {
            y: isDesktop ? -200 : -100,
            opacity: 0,
            scale: 0.9,
            duration: 1,
          })
          // Move the vibrant background blobs around
          .to(".shape-1", { x: isDesktop ? "20vw" : "10vw", y: "20vh", scale: 1.5, duration: 1.5 }, "<")
          .to(".shape-2", { x: isDesktop ? "-20vw" : "-10vw", y: "-20vh", scale: 1.5, duration: 1.5 }, "<")
          
          // Pull stats container up from the bottom to replace the headlines
          .fromTo(
            ".stats-container",
            { y: "20vh", opacity: 0 },
            { y: "0vh", opacity: 1, duration: 1 },
            "-=0.5" // Overlap so there is no dead space
          )
          
          // Pop the stats in
          .fromTo(
            ".stat-item",
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8 },
            "<0.2"
          );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    // Bright background (bg-white), 300vh so you have plenty of room to scroll
    <div
      ref={containerRef}
      className="relative w-full h-[300vh] bg-white text-slate-900 font-sans selection:bg-pink-500/30"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* --- VIBRANT BACKGROUND SHAPES --- */}
        {/* mix-blend-multiply ensures the colors burn into the white background perfectly */}
        <div className="shape-item shape-1 absolute top-[10%] right-[10%] w-72 h-72 md:w-[35rem] md:h-[35rem] rounded-full bg-gradient-to-br from-pink-500 to-orange-400 blur-[80px] md:blur-[120px] pointer-events-none opacity-0 mix-blend-multiply" />
        <div className="shape-item shape-2 absolute bottom-[10%] left-[10%] w-64 h-64 md:w-[30rem] md:h-[30rem] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 blur-[80px] md:blur-[120px] pointer-events-none opacity-0 mix-blend-multiply" />

        {/* --- LAYER 1: HEADLINES (Only this shows on load) --- */}
        <div className="headline-container absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full z-10">
          <div className="overflow-hidden mb-2">
            <h1 className="headline-text text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.2em] md:tracking-[0.4em] text-slate-900 ml-[0.2em]">
              WELCOME
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2 className="headline-text text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.3em] md:tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 ml-[0.3em]">
              ITZFIZZ
            </h2>
          </div>
        </div>

        {/* --- LAYER 2: IMPACT METRICS (Hidden on load, scrolls into view) --- */}
        <div className="stats-container absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full opacity-0 pointer-events-none z-20">
          <div className="pointer-events-auto flex flex-wrap justify-center gap-12 md:gap-24 w-full max-w-6xl">
            
            {/* Stat 1: Hot Pink */}
            <div className="stat-item flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black text-pink-500 drop-shadow-md">
                300%
              </span>
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-slate-600 mt-4">
                Revenue Growth
              </span>
            </div>

            {/* Stat 2: Vivid Orange */}
            <div className="stat-item flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black text-orange-500 drop-shadow-md">
                10ms
              </span>
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-slate-600 mt-4">
                Action Latency
              </span>
            </div>

            {/* Stat 3: Electric Blue */}
            <div className="stat-item flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black text-blue-500 drop-shadow-md">
                99.9%
              </span>
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-slate-600 mt-4">
                Client Retention
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}