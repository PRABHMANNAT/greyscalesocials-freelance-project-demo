import Link from "next/link";
import { instagram, projects } from "@/lib/projects";
import { Arrow, Asterisk } from "./icons";

export function PerspectiveStrip() {
  return <div className="perspective-strip" aria-label="Independent thinking. A different perspective."><div className="perspective-track" aria-hidden="true">{[0,1,2].map(index => <span key={index}>Independent thinking.<Asterisk /><em>A different perspective.</em><Asterisk /></span>)}</div></div>;
}

export function CreativeBrief() {
  return <section className="creative-brief section-pad"><div className="brief-note" data-reveal><span className="eyebrow">05 / YOUR NEXT CHAPTER</span><Asterisk /><span className="brief-note-title">It starts<br />with a <em>hello.</em></span><span className="eyebrow">A FRESH PAIR OF EYES CAN CHANGE EVERYTHING.</span></div><div className="brief-copy" data-reveal><span className="eyebrow">SOMETHING ON YOUR MIND?</span><h2>A new idea.<br />A fresh start.<br /><em>A bigger feeling.</em></h2><p>Tell us what you’re building, what you want people to feel, and where you’d like to go next. Let’s start a conversation.</p><a className="round-link" href={instagram} target="_blank" rel="noreferrer">Start a conversation <Arrow diagonal /></a><div className="brief-prompts"><span>01 / Your brand</span><span>02 / Your ambition</span><span>03 / Your next move</span></div></div></section>;
}

export function PortfolioNumbers() {
  const frames = projects.reduce((sum, project) => sum + project.media.length, 0);
  return <div className="portfolio-numbers"><div><strong>{String(projects.length).padStart(2,"0")}</strong><span>BRAND WORLDS</span></div><div><strong>{String(frames).padStart(2,"0")}</strong><span>ORIGINAL FRAMES</span></div><div><strong>03</strong><span>CREATIVE DISCIPLINES</span></div></div>;
}

export function StudioApproach() {
  return <section className="studio-approach section-pad"><div className="approach-lead" data-reveal><span className="eyebrow">03 / FROM HELLO TO WHAT’S NEXT</span><h2>Small details.<br /><em>Whole worlds.</em></h2><p>A proposed way to begin a creative collaboration.</p><Link href="/work" className="line-link">See the perspective in practice <Arrow diagonal /></Link></div><div className="approach-steps">{[
    {title:"First, a conversation.",copy:"The brand. The audience. The ambition. A good starting point makes room for the right questions.",tags:"LISTEN / UNDERSTAND / ALIGN"},
    {title:"Then, a direction.",copy:"Bring the thinking into focus. A visual point of view, a clear story, and a feeling to work towards.",tags:"EXPLORE / SHAPE / CREATE"},
    {title:"And room to grow.",copy:"Carry the idea into the world with care. Keep the details connected as the brand’s story unfolds.",tags:"REFINE / CONNECT / EVOLVE"},
  ].map((step,index) => <article key={step.title} data-reveal><span className="approach-step-number">0{index+1}</span><div><h3>{step.title}</h3><p>{step.copy}</p><span className="eyebrow">{step.tags}</span></div><Arrow diagonal /></article>)}</div></section>;
}
