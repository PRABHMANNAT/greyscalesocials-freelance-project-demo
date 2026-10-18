"use client";

import { useState } from "react";
import { capabilities, instagram } from "@/lib/projects";
import { Arrow } from "./icons";

export function Capabilities() {
  const [active, setActive] = useState<number | null>(0);
  return <section className="capabilities section-pad">
    <div className="section-heading"><span className="eyebrow">03 / WHAT WE BRING</span><h2>Good ideas.<br /><em>Everywhere.</em></h2><p>From a first impression to a lasting one.<br />Three ways to move your brand forward.</p></div>
    <div className="capability-list">{capabilities.map((item,index) => <div className={active === index ? "capability-row expanded" : "capability-row"} key={item.number}>
      <h3><button aria-expanded={active === index} aria-controls={`capability-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="capability-number">{item.number}</span><span>{item.name}</span><span className="capability-plus">{active === index ? "−" : "+"}</span></button></h3>
      <div className="capability-panel" id={`capability-${index}`} hidden={active !== index}><p>{item.detail}</p><span>{item.note}</span><a href={instagram} target="_blank" rel="noreferrer" aria-label={`Discuss ${item.name} on Instagram`}><Arrow diagonal /></a></div>
    </div>)}</div>
  </section>;
}
