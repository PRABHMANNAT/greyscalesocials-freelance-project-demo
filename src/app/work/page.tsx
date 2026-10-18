import type { Metadata } from "next";
import { ProjectGallery } from "@/components/project-gallery";
import { projects } from "@/lib/projects";
import { Asterisk } from "@/components/icons";
import { StudioFilm } from "@/components/studio-film";

export const metadata: Metadata = {title:"Selected work"};

export default function Work() {
  const coverCount = projects.reduce((count, project) => count + project.media.length, 0);
  return <main id="main" className="work-page section-pad"><div className="page-kicker"><span className="eyebrow">THE GREYSCALE PERSPECTIVE</span><span className="eyebrow">PORTFOLIO / 2026</span></div><div className="work-opening"><h1>Selected<br /><em>work.</em><sup>({String(projects.length).padStart(2,"0")})</sup></h1><div><Asterisk /><p>Different brands.<br />Different worlds.<br />One considered perspective.</p><span className="eyebrow">A CURATED INSTAGRAM SELECTION</span></div></div><StudioFilm compact /><ProjectGallery /><div className="work-endnote"><span>End of the edit.<br /><em>Beginning of a conversation.</em></span><span className="eyebrow">{projects.length} BRANDS / {coverCount} ORIGINAL COVERS<br />FULL REELS LINK TO INSTAGRAM.</span></div></main>;
}
