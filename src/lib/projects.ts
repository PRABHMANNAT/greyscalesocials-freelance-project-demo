export const instagram = "https://www.instagram.com/greyscalesocials.in/";

export type Media = {
  src: string;
  alt: string;
  source: string;
  date: string;
  width: number;
  height: number;
  video?: string;
};

export type Project = {
  id: string;
  name: string;
  category: "Food & culture" | "Hospitality" | "Retail";
  color: string;
  ink: string;
  label: string;
  media: Media[];
};

const cover = (file: string, alt: string, source: string, date: string, width = 360): Media => ({
  src: `/assets/thumbnails/${file}.jpg`, alt, source: `https://www.instagram.com/${source}/`, date, width, height: 640,
});

// Only names, dates and images visible in the studio's public Instagram feed.
// Categories and short display labels are editorial organisation, not service claims.
export const projects: Project[] = [
  {
    id: "kesar-da-dhaba", name: "Kesar Da Dhaba", category: "Food & culture", color: "#d7dcbe", ink: "#26352b", label: "A taste of Amritsar.",
    media: [
      cover("kesar-01", "Two women in an Amritsar street, framed by a rickshaw", "kesardadhaba/reel/DWOuSOnE_X4", "2026-03-23", 361),
      cover("kesar-02", "Reel cover from Kesar Da Dhaba's public Instagram feed", "kesardadhaba/reel/DVJMbUjCRZq", "2026-02-24"),
    ],
  },
  {
    id: "countryside", name: "Countryside Factory Outlets", category: "Retail", color: "#343b8e", ink: "#faf8f0", label: "Colour outside the lines.",
    media: [
      cover("countryside-01", "Hands presenting a brightly coloured sneaker", "countrysidefactoryoutlet/reel/DaO_kc_CiCW", "2026-06-30"),
      cover("countryside-02", "Countryside Factory Outlets reel cover, March 23", "countrysidefactoryoutlet/reel/DWOsQ5yiSsd", "2026-03-23"),
      cover("countryside-03", "Countryside Factory Outlets reel cover, March 15", "countrysidefactoryoutlet/reel/DV5_RnhgsIM", "2026-03-15"),
      cover("countryside-04", "Countryside Factory Outlets reel cover, January 22", "countrysidefactoryoutlet/reel/DT0NgnolEC7", "2026-01-22"),
      cover("countryside-05", "Countryside Factory Outlets reel cover, January 17", "countrysidefactoryoutlet/reel/DTnT8fNglVK", "2026-01-17"),
    ],
  },
  {
    id: "galini", name: "Galini Café", category: "Hospitality", color: "#ddc8b7", ink: "#443224", label: "Pause. Pour. Repeat.",
    media: [cover("galini-01", "A matcha drink being poured into a glass at Galini Café", "galini_cafe_n_restro/reel/DTabcTYiVcx", "2026-01-12")],
  },
  {
    id: "lovely-sweets", name: "Lovely Sweets Amritsar", category: "Food & culture", color: "#79332b", ink: "#fff4d8", label: "Little moments. Lovely stories.",
    media: [
      cover("lovely-sweets-02", "A hand selecting a sweet from an ornate red gift box", "lovelysweetsamritsar/reel/DUs0SL3DSDW", "2026-02-13"),
      cover("lovely-sweets-01", "A celebratory scene from Lovely Sweets Amritsar's public reel", "lovelysweetsamritsar/reel/Db4p9FliNkp", "2026-08-10"),
    ],
  },
  {
    id: "golden-sarovar", name: "Golden Sarovar Portico", category: "Hospitality", color: "#bca46e", ink: "#27251e", label: "The art of a warm welcome.",
    media: [cover("golden-sarovar-01", "A chef at Golden Sarovar Portico, Amritsar", "goldensarovarportico/reel/DYXMgJcBZlI", "2026-05-15", 361)],
  },
  {
    id: "spicy-hut", name: "Spicy Hut", category: "Food & culture", color: "#d5d1bb", ink: "#34372b", label: "Something to savour.",
    media: [cover("spicy-hut-01", "Spicy Hut's original public reel cover", "spicyhut.asr/reel/DTaYhy8jd3Y", "2026-01-12")],
  },
];

export const capabilities = [
  { number: "01", name: "Brand collaterals", detail: "A clear identity, carried through every touchpoint.", note: "Make every detail feel like you." },
  { number: "02", name: "Digital marketing", detail: "Ideas for the places your audience spends time.", note: "Give your brand a reason to be seen." },
  { number: "03", name: "Consultation", detail: "A fresh perspective on your brand’s next chapter.", note: "Start with the right conversation." },
];
