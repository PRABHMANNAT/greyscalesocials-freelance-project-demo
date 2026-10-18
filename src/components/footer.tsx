import Link from "next/link";
import { instagram } from "@/lib/projects";
import { Arrow, Asterisk } from "./icons";

export function Footer() {
  return <footer className="site-footer" id="contact">
    <div className="footer-top"><span className="eyebrow"><span className="live-dot" /> A GOOD PLACE TO START</span><span className="eyebrow">YOUR NEXT CHAPTER</span></div>
    <a href={instagram} target="_blank" rel="noreferrer" className="footer-invitation"><span>Let’s make<br /><em>something</em> matter.</span><Arrow diagonal /></a>
    <div className="footer-details"><p>A fresh perspective is<br />one conversation away.</p><a href={instagram} target="_blank" rel="noreferrer" className="line-link">@greyscalesocials.in <Arrow diagonal /></a><span>Punjab · Chandigarh · Delhi</span></div>
    <div className="footer-wordmark" aria-label="Greyscale Socials">greyscale<Asterisk /></div>
    <div className="footer-bottom"><span>© 2026 Greyscale Socials</span><nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/work">Work</Link></nav><span>Independent perspective. Extraordinary possibilities.</span></div>
    <div className="concept-note">Private website concept · Public Instagram reel covers shown for preview · Original media and studio copy pending approval.</div>
  </footer>;
}
