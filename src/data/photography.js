// Sagar's Cinematic Photography Chronicles Database
// Stores real photography assets and details for the Creative Portfolio
// Sorted in descending order (Newest first)

import img1 from "../assets/photography/IMG_4302.HEIC.jpg";
import img2 from "../assets/photography/IMG_8982.jpeg";
import img3 from "../assets/photography/IMG_0284.JPG.jpeg";
import img4 from "../assets/photography/IMG_9457.JPG.jpeg";
import img5 from "../assets/photography/IMG_9061.jpeg";
import img6 from "../assets/photography/Snapchat-1309016582.jpg.jpeg";
import img7 from "../assets/photography/FullSizeRender-293.jpg.jpeg";
import img8 from "../assets/photography/1745615528223.jpg.jpeg";
import img9 from "../assets/photography/IMG20260514201657.heic.jpg";
import img10 from "../assets/photography/IMG_20260514_025439_233.webp";
import img11 from "../assets/photography/IMG_20260513_234212_163.webp";
import img12 from "../assets/photography/IMG_20260507_154005_933.webp";
import img13 from "../assets/photography/IMG_20260404_121729283.jpg.jpeg";
import img14 from "../assets/photography/IMG_20260324_182519263.jpg.jpeg";
import img15 from "../assets/photography/IMG_20260324_183224108.jpg.jpeg";
import img16 from "../assets/photography/IMG_20260324_183826862.jpg.jpeg";
import img17 from "../assets/photography/IMG_20260302_195034318 (1).jpg.jpeg";
import img18 from "../assets/photography/IMG_20260302_195539246.jpg.jpeg";
import img19 from "../assets/photography/IMG_20260224_131415814.jpg.jpeg";
import img20 from "../assets/photography/IMG-20260122-WA0114.jpg.jpeg";
import img21 from "../assets/photography/IMG_20260101_173759396.jpg.jpeg";
import img22 from "../assets/photography/IMG_20260101_174634606.jpg.jpeg";
import img23 from "../assets/photography/IMG_20260101_174725480.jpg.jpeg";
import img24 from "../assets/photography/IMG_20260101_174739890.jpg.jpeg";
import img25 from "../assets/photography/IMG_20260101_174815231.jpg.jpeg";
import img26 from "../assets/photography/IMG_20260101_174857690.jpg.jpeg";
import img27 from "../assets/photography/IMG-20250724-WA0074 (1).jpg.jpeg";
import img28 from "../assets/photography/IMG_20250619_180601627.jpg.jpeg";
import img29 from "../assets/photography/PSX_20250524_212545~2.jpg.jpeg";
import img30 from "../assets/photography/IMG_20250515_191132500.jpg.jpeg";
import img31 from "../assets/photography/IMG-20250425-WA0078.jpg.jpeg";
import img32 from "../assets/photography/IMG-20240718-WA0064.jpg.jpeg";

export const photographyData = [
  {
    id: "photo-1",
    src: img1,
    title: "Golden Halo",
    category: "Creative Portrait",
    location: "Downtown Gateway",
    meta: "85mm • f/1.4 • ISO 100 • 1/320s",
    desc: "High contrast side lighting outlining clean facial contours and form."
  },
  {
    id: "photo-2",
    src: img2,
    title: "Concrete Ribs",
    category: "Urban Architecture",
    location: "Central Crossing",
    meta: "24mm • f/2.8 • ISO 400 • 1/125s",
    desc: "Brutalist concrete lines rising in repetitive symmetric patterns."
  },
  {
    id: "photo-3",
    src: img3,
    title: "Chiaroscuro study",
    category: "Creative Portrait",
    location: "Industrial Valley",
    meta: "35mm • f/1.8 • ISO 800 • 1/60s",
    desc: "Intricate shadows cast across the subject's face using patterned panels."
  },
  {
    id: "photo-4",
    src: img4,
    title: "Desert Silence",
    category: "Minimal Landscape",
    location: "Harbor Overlook",
    meta: "70mm • f/2.8 • ISO 100 • 1/1000s",
    desc: "Receding ridges stacked in deep atmospheric sequence in thick mist."
  },
  {
    id: "photo-5",
    src: img5,
    title: "Midnight Shift",
    category: "Cinematic Street",
    location: "Highland Ridge",
    meta: "50mm • f/2.0 • ISO 320 • 1/160s",
    desc: "Converging street shapes and reflective asphalt framing transient movement."
  },
  {
    id: "photo-6",
    src: img6,
    title: "Prismatic Shade",
    category: "Creative Portrait",
    location: "Metro Interchange",
    meta: "85mm • f/1.2 • ISO 64 • 1/500s",
    desc: "Soft rim light highlighting hair details against a dark bokeh backdrop."
  },
  {
    id: "photo-7",
    src: img7,
    title: "Neon Dreams",
    category: "Neon/Night",
    location: "Old Quarters",
    meta: "105mm • f/1.4 • ISO 100 • 1/800s",
    desc: "Vibrant pink and cyan neon signs casting long reflections across wet asphalt."
  },
  {
    id: "photo-8",
    src: img8,
    title: "Cyber Alleyway",
    category: "Neon/Night",
    location: "Cyber Plaza",
    meta: "24mm • f/5.6 • ISO 200 • 1/200s",
    desc: "Vibrant pink and cyan neon signs casting long reflections across wet asphalt."
  },
  {
    id: "photo-9",
    src: img9,
    title: "Rainlit Junction",
    category: "Neon/Night",
    location: "Wheat Fields",
    meta: "35mm • f/1.4 • ISO 1200 • 1/80s",
    desc: "Receding street illumination trails forming a dynamic light stream."
  },
  {
    id: "photo-10",
    src: img10,
    title: "Chasing Solitude",
    category: "Cinematic Street",
    location: "Ocean Cliffs",
    meta: "50mm • f/1.8 • ISO 200 • 1/250s",
    desc: "A candid capture cutting across shadows during high contrast hours."
  },
  {
    id: "photo-11",
    src: img11,
    title: "Ethereal Form",
    category: "Creative Portrait",
    location: "Sagar's Studio",
    meta: "85mm • f/1.4 • ISO 100 • 1/320s",
    desc: "High contrast side lighting outlining clean facial contours and form."
  },
  {
    id: "photo-12",
    src: img12,
    title: "Brutalist Pillar",
    category: "Urban Architecture",
    location: "Downtown Gateway",
    meta: "24mm • f/2.8 • ISO 400 • 1/125s",
    desc: "Brutalist concrete lines rising in repetitive symmetric patterns."
  },
  {
    id: "photo-13",
    src: img13,
    title: "Tokyo Drift",
    category: "Neon/Night",
    location: "Central Crossing",
    meta: "35mm • f/1.8 • ISO 800 • 1/60s",
    desc: "Specks of rain on the lens catching specular highlights from storefront signs."
  },
  {
    id: "photo-14",
    src: img14,
    title: "Nature's Cadence",
    category: "Minimal Landscape",
    location: "Industrial Valley",
    meta: "70mm • f/2.8 • ISO 100 • 1/1000s",
    desc: "Receding ridges stacked in deep atmospheric sequence in thick mist."
  },
  {
    id: "photo-15",
    src: img15,
    title: "Urban Transit",
    category: "Cinematic Street",
    location: "Harbor Overlook",
    meta: "50mm • f/2.0 • ISO 320 • 1/160s",
    desc: "A candid capture cutting across shadows during high contrast hours."
  },
  {
    id: "photo-16",
    src: img16,
    title: "Whispers in Studio",
    category: "Creative Portrait",
    location: "Highland Ridge",
    meta: "85mm • f/1.2 • ISO 64 • 1/500s",
    desc: "Soft rim light highlighting hair details against a dark bokeh backdrop."
  },
  {
    id: "photo-17",
    src: img17,
    title: "Labyrinth of Steel",
    category: "Urban Architecture",
    location: "Metro Interchange",
    meta: "105mm • f/1.4 • ISO 100 • 1/800s",
    desc: "Sleek minimalist shadows playing off modern architecture curves."
  },
  {
    id: "photo-18",
    src: img18,
    title: "Club Spectrum",
    category: "Neon/Night",
    location: "Old Quarters",
    meta: "24mm • f/5.6 • ISO 200 • 1/200s",
    desc: "Specks of rain on the lens catching specular highlights from storefront signs."
  },
  {
    id: "photo-19",
    src: img19,
    title: "Fading Horizon",
    category: "Minimal Landscape",
    location: "Cyber Plaza",
    meta: "35mm • f/1.4 • ISO 1200 • 1/80s",
    desc: "Stark volcanic textures framed by soft, high-key ocean mist."
  },
  {
    id: "photo-20",
    src: img20,
    title: "Contour Lines",
    category: "Creative Portrait",
    location: "Wheat Fields",
    meta: "50mm • f/1.8 • ISO 200 • 1/250s",
    desc: "Intricate shadows cast across the subject's face using patterned panels."
  },
  {
    id: "photo-21",
    src: img21,
    title: "Gilded Profile",
    category: "Creative Portrait",
    location: "Ocean Cliffs",
    meta: "85mm • f/1.4 • ISO 100 • 1/320s",
    desc: "High contrast side lighting outlining clean facial contours and form."
  },
  {
    id: "photo-22",
    src: img22,
    title: "Symmetric Rise",
    category: "Urban Architecture",
    location: "Sagar's Studio",
    meta: "24mm • f/2.8 • ISO 400 • 1/125s",
    desc: "Aggressive low-angle view looking straight up a modern office structure."
  },
  {
    id: "photo-23",
    src: img23,
    title: "Specular Splash",
    category: "Neon/Night",
    location: "Downtown Gateway",
    meta: "35mm • f/1.8 • ISO 800 • 1/60s",
    desc: "Receding street illumination trails forming a dynamic light stream."
  },
  {
    id: "photo-24",
    src: img24,
    title: "Suspended Peak",
    category: "Minimal Landscape",
    location: "Central Crossing",
    meta: "70mm • f/2.8 • ISO 100 • 1/1000s",
    desc: "A solitary silhouette sitting on a massive ridge under silent skies."
  },
  {
    id: "photo-25",
    src: img25,
    title: "The Long Walk",
    category: "Cinematic Street",
    location: "Industrial Valley",
    meta: "50mm • f/2.0 • ISO 320 • 1/160s",
    desc: "A lonely figure traversing the sprawling concrete grid in low-key lighting."
  },
  {
    id: "photo-26",
    src: img26,
    title: "Amber Vignette",
    category: "Creative Portrait",
    location: "Harbor Overlook",
    meta: "85mm • f/1.2 • ISO 64 • 1/500s",
    desc: "Soft rim light highlighting hair details against a dark bokeh backdrop."
  },
  {
    id: "photo-27",
    src: img27,
    title: "Creative Portrait 27",
    category: "Creative Portrait",
    location: "Highland Ridge",
    meta: "105mm • f/1.4 • ISO 100 • 1/800s",
    desc: "Soft rim light highlighting hair details against a dark bokeh backdrop."
  },
  {
    id: "photo-28",
    src: img28,
    title: "Twilight Shadows",
    category: "Neon/Night",
    location: "Metro Interchange",
    meta: "24mm • f/5.6 • ISO 200 • 1/200s",
    desc: "High sensitivity capture rich with glowing cyberpunk city vibes."
  },
  {
    id: "photo-29",
    src: img29,
    title: "Luminous Haze",
    category: "Neon/Night",
    location: "Old Quarters",
    meta: "35mm • f/1.4 • ISO 1200 • 1/80s",
    desc: "Vibrant pink and cyan neon signs casting long reflections across wet asphalt."
  },
  {
    id: "photo-30",
    src: img30,
    title: "Parallel Paths",
    category: "Cinematic Street",
    location: "Cyber Plaza",
    meta: "50mm • f/1.8 • ISO 200 • 1/250s",
    desc: "A candid capture cutting across shadows during high contrast hours."
  },
  {
    id: "photo-31",
    src: img31,
    title: "Creative Portrait 31",
    category: "Creative Portrait",
    location: "Wheat Fields",
    meta: "85mm • f/1.4 • ISO 100 • 1/320s",
    desc: "Warm, expressive studio lighting capturing deep emotional honesty."
  },
  {
    id: "photo-32",
    src: img32,
    title: "Creative Portrait 32",
    category: "Creative Portrait",
    location: "Ocean Cliffs",
    meta: "24mm • f/2.8 • ISO 400 • 1/125s",
    desc: "High contrast side lighting outlining clean facial contours and form."
  }
];

export const photographyCategories = [
  "All",
  "Cinematic Street",
  "Creative Portrait",
  "Urban Architecture",
  "Neon/Night",
  "Minimal Landscape"
];
