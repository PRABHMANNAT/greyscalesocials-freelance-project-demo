import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, Asterisk } from "@/components/icons";
import { PortfolioNumbers, StudioApproach, PerspectiveStrip } from "@/components/studio-content";

export const metadata: Metadata = {title:"The studio"};

const principles = [
  {title:"Feeling comes first.",text:"The people, places and small moments behind a brand give its story meaning. Start with something worth caring about."},
  {title:"The details tell it.",text:"A considered frame. A colour that belongs. A few well-chosen words. Small decisions shape the whole impression."},
  {title:"Different is personal.",text:"Every brand has its own character. A point of view should feel like an honest expression of that world."},
];

export default function About() {
  return <main id="main" className="about-page">
    <section className="about-opening section-pad"><div className="page-kicker"><span className="eyebrow">A LITTLE ABOUT GREYSCALE</span><span className="eyebrow">INDEPENDENT IN SPIRIT.</span></div><h1>A different<br /><em>perspective.</em><Asterisk /></h1><div className="about-opening-bottom"><span className="eyebrow">BASED IN CULTURE.<br />BUILT AROUND BRANDS.</span><p>We create something extraordinary.<br />Through brand collaterals, digital marketing, and consultation.</p></div></section>
    <section className="about-manifesto section-pad"><span className="eyebrow">01 / OUR WORLD</span><div><h2 data-reveal>Greyscale in name.<br /><em>Never in imagination.</em></h2><div className="about-story"><p>Greyscale Socials works across Punjab, Chandigarh, and Delhi. Our public portfolio moves through food, hospitality, retail, and the people who bring those worlds to life.</p><p>Every world has its own texture. A familiar street. A table worth gathering around. A colour you remember. This is a space for those stories, and for the brands behind them.</p></div><PortfolioNumbers /></div></section>
    <section className="about-visual section-pad" aria-label="Frames from the studio portfolio"><div className="about-visual-type"><span className="eyebrow">OUR WORLD, IN FULL COLOUR.</span><span>Culture.<br /><em>Connection.</em><br />A little curiosity.</span><p>A few frames from the public portfolio.<br />Real places. Real details.</p></div><figure className="about-photo about-photo-one" data-reveal><Image src="/assets/thumbnails/kesar-01.jpg" alt="An Amritsar street, seen through a rickshaw in Kesar Da Dhaba's reel cover" width={361} height={640} sizes="(max-width: 600px) 48vw, 300px" /><figcaption>01 / ON THE STREETS OF AMRITSAR</figcaption></figure><figure className="about-photo about-photo-two" data-reveal><Image src="/assets/thumbnails/lovely-sweets-02.jpg" alt="A colourful sweet gift box from Lovely Sweets Amritsar's reel cover" width={360} height={640} sizes="(max-width: 600px) 48vw, 260px" /><figcaption>02 / THE BEAUTY IN THE DETAILS</figcaption></figure></section>
    <section className="philosophy section-pad"><div className="section-heading"><span className="eyebrow">02 / A CREATIVE POINT OF VIEW</span><h2>Instinct, with<br /><em>intention.</em></h2><p>A proposed creative philosophy<br />for the studio’s next digital chapter.</p></div><div className="principles">{principles.map((principle,index) => <article key={principle.title} data-reveal><span className="principle-number">0{index+1}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div></section>
    <PerspectiveStrip />
    <StudioApproach />
    <section className="about-closing section-pad"><span className="eyebrow">LESS TALK. MORE PERSPECTIVE.</span><Link href="/work"><span>The work<br /><em>says it best.</em></span><Arrow diagonal /></Link></section>
  </main>;
}
