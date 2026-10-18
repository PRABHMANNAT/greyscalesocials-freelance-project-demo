"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { Arrow, Asterisk } from "./icons";

const worlds = [
  {name:"Food & culture",line:"A little flavour. A lot of feeling.",copy:"Familiar places. Shared tables. The details that make a city feel like itself.",image:"lovely-sweets-02",color:"#79332b",ink:"#fff4d8"},
  {name:"Hospitality",line:"Places you want to come back to.",copy:"A thoughtful welcome. A moment to pause. Stories that bring a place closer.",image:"galini-01",color:"#d9c6b2",ink:"#443224"},
  {name:"Retail",line:"A point of view you can wear.",copy:"Colour, character, and the joy of finding something that feels like you.",image:"countryside-01",color:"#343b8e",ink:"#f4f3ed"},
];

export function StudioWorlds() {
  const [active, setActive] = useState(0);
  const world = worlds[active];
  const brands = projects.filter(project => project.category === world.name);
  return <section className="studio-worlds section-pad">
    <div className="worlds-intro" data-reveal><span className="eyebrow">04 / DIFFERENT WORLDS. ONE PERSPECTIVE.</span><h2>Good stories<br />live <em>everywhere.</em></h2><p>Step into a few of the worlds<br />in our public portfolio.</p></div>
    <div className="world-tabs" role="tablist" aria-label="Explore the studio’s portfolio worlds">{worlds.map((item,index) => <button key={item.name} id={`world-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`world-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
      const next = event.key === "ArrowRight" ? (active + 1) % worlds.length : event.key === "ArrowLeft" ? (active - 1 + worlds.length) % worlds.length : event.key === "Home" ? 0 : event.key === "End" ? worlds.length - 1 : null;
      if (next !== null) { event.preventDefault(); setActive(next); document.getElementById(`world-tab-${next}`)?.focus(); }
    }}><span>0{index + 1}</span>{item.name}<Arrow diagonal /></button>)}</div>
    <div key={world.name} id={`world-panel-${active}`} role="tabpanel" aria-labelledby={`world-tab-${active}`} className="world-panel" style={{background:world.color,color:world.ink}}>
      <div className="world-copy"><span className="eyebrow">A WORLD OF / {world.name}</span><h3>{world.line}</h3><p>{world.copy}</p><div className="world-brands">{brands.map(brand => <span key={brand.id}>{brand.name}</span>)}</div><Link className="line-link" href="/work">Explore the work <Arrow diagonal /></Link></div>
      <div className="world-picture"><span className="world-large-word" aria-hidden="true">{active === 0 ? "taste." : active === 1 ? "stay." : "find."}</span><Image src={`/assets/thumbnails/${world.image}.jpg`} alt={brands.find(brand => brand.media.some(media => media.src.includes(world.image)))?.media[0].alt ?? `Original ${world.name} portfolio cover`} width={360} height={640} sizes="(max-width: 767px) 55vw, 300px" /><span className="world-picture-label">A FRAME FROM THE GREYSCALE WORLD</span></div>
      <Asterisk className="world-asterisk" />
    </div>
  </section>;
}
