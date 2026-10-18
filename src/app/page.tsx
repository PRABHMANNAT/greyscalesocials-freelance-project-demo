import Link from "next/link";
import { HeroContactSheet, ProjectGallery } from "@/components/project-gallery";
import { Capabilities } from "@/components/capabilities";
import { Arrow, Asterisk } from "@/components/icons";
import { StudioFilm } from "@/components/studio-film";
import { StudioWorlds } from "@/components/studio-worlds";
import { CreativeBrief, PerspectiveStrip, PortfolioNumbers } from "@/components/studio-content";

export default function Home() {
  return <main id="main">
    <section className="hero section-pad">
      <div className="hero-eyebrow"><span className="eyebrow"><span className="live-dot" /> INDEPENDENT THINKING. EXTRAORDINARY POSSIBILITIES.</span><span className="eyebrow">PUNJAB · CHANDIGARH · DELHI</span></div>
      <div className="hero-title-row"><h1><span className="title-mask"><span>Anything but</span></span><span className="title-mask"><span><em>ordinary.</em><span className="hero-period">*</span></span></span></h1><div className="hero-aside"><span className="eyebrow">A CREATIVE STUDIO<br />WITH A DIFFERENT PERSPECTIVE.</span><p>We create something<br /><strong>extraordinary.</strong></p><Link className="line-link" href="/work">Step into our world <Arrow diagonal /></Link></div></div>
      <StudioFilm />
      <div className="hero-footnote"><span className="eyebrow">BRANDS. PEOPLE. CULTURE.</span><a href="#selected-work" className="scroll-invitation">SCROLL INTO OUR WORLD <span>↓</span></a><span className="eyebrow">FULL COLOUR. FULL FEELING.</span></div>
    </section>
    <PerspectiveStrip />
    <section className="selected-work section-pad" id="selected-work"><div className="section-heading" data-reveal><span className="eyebrow">01 / THE SOCIAL EDIT</span><h2>Good work.<br /><em>Real feeling.</em></h2><p>A selection from our Instagram world.<br />Food, places, people. All with a point of view.</p></div><ProjectGallery selected /></section>
    <section className="studio-intro section-pad"><div className="intro-top"><span className="eyebrow">02 / THE STUDIO</span><Asterisk /></div><h2 data-reveal>There’s a story<br />in <em>everything.</em><br /><span className="intro-indented">Let’s find yours.</span></h2><div className="intro-bottom"><span className="eyebrow">GREYSCALE IN NAME.<br />FULL COLOUR IN SPIRIT.</span><p>Brand collaterals. Digital marketing. Consultation. A creative perspective that connects the dots between how a brand looks and how it feels.</p><Link href="/about" className="round-link">Meet Greyscale <Arrow diagonal /></Link></div><PortfolioNumbers /></section>
    <Capabilities />
    <StudioWorlds />
    <section className="contact-sheet-section section-pad"><div className="contact-section-heading" data-reveal><span className="eyebrow">THE CONTACT SHEET</span><h2>One frame.<br /><em>A whole feeling.</em></h2><p>Take a closer look. Every frame<br />opens a different story.</p></div><HeroContactSheet /></section>
    <CreativeBrief />
  </main>;
}
