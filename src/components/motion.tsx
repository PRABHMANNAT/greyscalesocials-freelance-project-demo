"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    elements.forEach((element,index) => { element.style.setProperty("--reveal-order", `${index % 3}`); element.classList.add("reveal-ready"); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("reveal-ready")); };
  }, [pathname]);
  useEffect(() => {
    let frame = 0;
    function update() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--page-progress", `${height > 0 ? window.scrollY / height : 0}`);
      frame = 0;
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll);
    update();
    return () => { window.removeEventListener("scroll",onScroll); window.removeEventListener("resize",onScroll); cancelAnimationFrame(frame); };
  }, [pathname]);
  return null;
}
