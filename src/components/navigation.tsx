"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { instagram } from "@/lib/projects";
import { Arrow } from "./icons";

const links = [{ href: "/", name: "Home" }, { href: "/about", name: "About" }, { href: "/work", name: "Work" }];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marker.current) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(marker.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const content = [...document.querySelectorAll<HTMLElement>("main, footer")];
    content.forEach(element => { element.inert = true; });
    document.dispatchEvent(new Event("greyscale:overlay-change"));
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const items = [menuButton.current, ...document.querySelectorAll<HTMLElement>("#mobile-menu a")].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = original; content.forEach(element => { element.inert = false; }); document.dispatchEvent(new Event("greyscale:overlay-change")); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return <><div ref={marker} className="nav-position-marker" aria-hidden="true" /><header className={`site-header ${scrolled ? "header-scrolled" : ""} ${open ? "header-menu-open" : ""}`}>
    <Link className="wordmark" href="/" aria-label="Greyscale Socials home" onClick={() => setOpen(false)}>
      <Image src="/assets/brand/instagram-profile-mark.jpg" alt="" width={42} height={42} priority />
      <span>greyscale<span className="wordmark-sub">socials</span></span>
    </Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link href={link.href} key={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.name}<span className="nav-dot" /></Link>)}</nav>
    <a className="header-contact line-link" href={instagram} target="_blank" rel="noreferrer">Let’s talk <Arrow diagonal /></a>
    <span className="nav-scroll-progress" aria-hidden="true"><span /></span>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span className={open ? "menu-icon is-open" : "menu-icon"}><i /><i /></span></button>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
      <span className="eyebrow">A DIFFERENT PERSPECTIVE</span>
      {links.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}><small>0{index + 1}</small>{link.name}<Arrow diagonal /></Link>)}
      <a className="mobile-social" href={instagram} target="_blank" rel="noreferrer">Find us on Instagram <Arrow diagonal /></a>
      <p>Punjab · Chandigarh · Delhi</p>
    </nav>}
  </header>{scrolled && !open && <button className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"})}><span>↑</span></button>}</>;
}
