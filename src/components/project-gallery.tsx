"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects, type Project, type Media } from "@/lib/projects";
import { Arrow } from "./icons";

function ProjectMedia({ media, priority = false, className = "" }: { media: Media; priority?: boolean; className?: string }) {
  return <Image className={className} src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 600px) 70vw, 360px" priority={priority} />;
}

function ProjectVideo({media,name}: {media: Media; name: string}) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) element?.play().catch(() => {});
    return () => element?.pause();
  }, []);
  return <video ref={video} src={media.video} poster={media.src} controls playsInline muted loop preload="metadata" aria-label={`${name} reel`} />;
}

function ProjectOverlay({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [slide, setSlide] = useState(0);
  const media = project.media[slide];
  useEffect(() => {
    const element = dialog.current;
    const active = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = overflow; active?.focus(); };
  }, []);
  function handleNext() { setSlide(0); onNext(); }
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => {
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === "ArrowRight") { event.preventDefault(); setSlide((slide + 1) % project.media.length); }
    if (event.key === "ArrowLeft") { event.preventDefault(); setSlide((slide - 1 + project.media.length) % project.media.length); }
  }}>
    <div className="project-dialog-inner" style={{ "--project-color": project.color, "--project-ink": project.ink } as CSSProperties}>
      <div className="dialog-image"><span className="eyebrow dialog-kicker">THE SOCIAL EDIT / 2026</span>
        {media.video ? <ProjectVideo key={media.video} media={media} name={project.name} /> : <ProjectMedia key={media.src} media={media} priority />}
        <span className="dialog-cover-note">{media.video ? "ORIGINAL REEL" : "ORIGINAL INSTAGRAM REEL COVER"}</span>
      </div>
      <div className="dialog-copy"><button className="close-button" onClick={onClose} aria-label="Close project presentation">Close <span>×</span></button>
        <div className="dialog-description"><span className="eyebrow">{project.category} / REEL SELECTION</span><h2 id="project-title">{project.name}</h2><p>A selection from the studio’s public Instagram portfolio. Explore the original post for the full story.</p>
          <dl><div><dt>Format</dt><dd>{media.video ? "Portrait film" : "Reel cover"}</dd></div><div><dt>Published</dt><dd>{new Intl.DateTimeFormat("en-GB", {day:"numeric",month:"long",year:"numeric", timeZone:"UTC"}).format(new Date(media.date))}</dd></div></dl>
          <a className="round-link" href={media.source} target="_blank" rel="noreferrer">Watch on Instagram <Arrow diagonal /></a>
          {project.media.length > 1 && <div className="dialog-thumbnails" aria-label="Choose a project image">{project.media.map((item,index) => <button key={item.src} onClick={() => setSlide(index)} aria-label={`View image ${index + 1}`} aria-pressed={slide === index}><Image src={item.src} alt="" width={36} height={64} sizes="36px" /></button>)}</div>}
        </div>
        <div className="dialog-navigation"><div className="slide-controls"><button aria-label="Previous image" disabled={project.media.length < 2} onClick={() => setSlide((slide - 1 + project.media.length) % project.media.length)}>←</button><span aria-live="polite" aria-atomic="true">{String(slide + 1).padStart(2,"0")} / {String(project.media.length).padStart(2,"0")}</span><button aria-label="Next image" disabled={project.media.length < 2} onClick={() => setSlide((slide + 1) % project.media.length)}>→</button></div><button className="line-link" onClick={handleNext}>Next story <Arrow /></button></div>
      </div>
    </div>
  </dialog>;
}

function ProjectIndex({ visible, onOpen }: {visible: Project[]; onOpen: (id: string) => void}) {
  const [preview, setPreview] = useState(visible[0]?.id);
  const project = visible.find(item => item.id === preview) ?? visible[0];
  return <div className="project-index">
    <div className="index-rows">{visible.map((item,index) => <button key={item.id} onMouseEnter={() => setPreview(item.id)} onFocus={() => setPreview(item.id)} onClick={() => onOpen(item.id)} className={item.id === project?.id ? "index-row index-row-active" : "index-row"} aria-label={`Explore ${item.name}`}><span className="index-number">0{index+1}</span><Image src={item.media[0].src} alt="" width={45} height={80} sizes="45px" /><span className="index-name">{item.name}<small>{item.category}</small></span><span className="index-frame-count">{String(item.media.length).padStart(2,"0")} FRAMES</span><Arrow diagonal /></button>)}</div>
    {project && <div className="index-preview" style={{background:project.color,color:project.ink}} key={project.id}><span className="eyebrow">THE SOCIAL EDIT / {project.category}</span><ProjectMedia media={project.media[0]} /><span className="index-preview-caption">{project.label}</span><button className="line-link" onClick={() => onOpen(project.id)}>Open story <Arrow diagonal /></button></div>}
  </div>;
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return <article className={`project-card project-card-${index % 4}`} data-reveal>
    <button className="project-art" onClick={onOpen} aria-label={`Explore ${project.name}`} style={{ "--project-color": project.color, "--project-ink": project.ink } as CSSProperties}>
      <span className="art-topline"><span>GREYSCALE / SOCIAL EDIT</span><span>0{index + 1}</span></span>
      <span className="project-art-title" aria-hidden="true">{project.label}</span>
      <span className="portrait-holder"><ProjectMedia media={project.media[0]} /></span>
      <span className="art-bottomline"><span>FROM THE INSTAGRAM ARCHIVE</span><span className="open-circle"><Arrow diagonal /></span></span>
    </button>
    <div className="project-caption"><div><h3><button onClick={onOpen}>{project.name}</button></h3><span>{project.category} <span className="caption-separator">/</span> Social content</span></div><span className="project-year">2026</span></div>
  </article>;
}

export function ProjectGallery({ selected = false }: { selected?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [category, setCategory] = useState("All work");
  const [view, setView] = useState<"gallery" | "index">("gallery");
  const visible = (selected ? projects.slice(0, 4) : projects).filter(project => category === "All work" || project.category === category);
  const activeProject = projects.find(project => project.id === active);
  return <>
    {!selected && <div className="work-filter" aria-label="Filter portfolio"><div className="filter-buttons">{["All work", "Food & culture", "Hospitality", "Retail"].map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === "All work" ? projects.length : projects.filter(p => p.category === item).length}</span></button>)}</div><div className="view-controls" aria-label="Portfolio layout"><button aria-pressed={view === "gallery"} onClick={() => setView("gallery")}><span aria-hidden="true">⊞</span> Gallery</button><button aria-pressed={view === "index"} onClick={() => setView("index")}><span aria-hidden="true">☰</span> Index</button></div></div>}
    {!selected && <div className="gallery-section-label"><span className="eyebrow" aria-live="polite">{String(visible.length).padStart(2,"0")} SELECTED STORIES</span><span className="eyebrow">CLICK A FRAME. FIND A STORY.</span></div>}
    {view === "gallery" || selected ? <div className="project-grid" key={category}>{visible.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setActive(project.id)} />)}</div> : <ProjectIndex key={category} visible={visible} onOpen={setActive} />}
    {selected && <div className="all-work-link"><span className="eyebrow">THERE’S MORE WHERE THAT CAME FROM.</span><Link href="/work" className="round-link">Explore all work <Arrow diagonal /></Link></div>}
    {activeProject && <ProjectOverlay project={activeProject} onClose={() => setActive(null)} onNext={() => setActive(projects[(projects.findIndex(p => p.id === active) + 1) % projects.length].id)} />}
  </>;
}

const edits = [[0,1,2,3,4], [3,2,4,0,1], [1,4,0,3,2]];

export function HeroContactSheet() {
  const [edit, setEdit] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const activeProject = projects.find(project => project.id === active);
  return <div className="hero-contact-sheet">
    <div className="contact-sheet-meta"><span className="eyebrow">A FEW FRAMES FROM OUR WORLD</span><button className="shuffle-button" onClick={() => setEdit((edit + 1) % edits.length)}>Switch the perspective <span>↻</span></button></div>
    <div className="contact-sheet-stage" onPointerMove={event => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX-rect.left)/rect.width-.5)*14}px`);
      event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY-rect.top)/rect.height-.5)*8}px`);
    }} onPointerLeave={event => {event.currentTarget.style.setProperty("--pointer-x","0px");event.currentTarget.style.setProperty("--pointer-y","0px");}}><div className="contact-sheet-rule" /><div className="contact-sheet-word" aria-hidden="true">a different perspective.</div>
      {edits[edit].map((projectIndex, index) => {
        const project = projects[projectIndex];
        return <button key={project.id} className={`hero-frame hero-frame-${index}`} onClick={() => setActive(project.id)} aria-label={`Open ${project.name}`}><ProjectMedia media={project.media[0]} priority /><span className="frame-label"><span>0{projectIndex+1} / {project.category}</span><Arrow diagonal /></span></button>;
      })}
      <div className="sheet-sticker" aria-hidden="true"><span>Made you<br /><em>look.</em></span><span>GREYSCALE SOCIALS ↗</span></div>
    </div>
    <div className="contact-sheet-bottom"><span className="eyebrow">BRANDS. PEOPLE. CULTURE.</span><Link className="scroll-invitation" href="/work">EXPLORE THE COMPLETE EDIT <span>↗</span></Link><span className="eyebrow">A LITTLE EXTRAORDINARY, EVERY DAY.</span></div>
    {activeProject && <ProjectOverlay project={activeProject} onClose={() => setActive(null)} onNext={() => setActive(projects[(projects.findIndex(p => p.id === active) + 1) % projects.length].id)} />}
  </div>;
}
