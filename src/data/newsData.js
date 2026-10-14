export const defaultCategories = [
  { category_id: "01", category_name: "Breaking News" },
  { category_id: "02", category_name: "Regular News" },
  { category_id: "03", category_name: "International News" },
  { category_id: "04", category_name: "Sports" },
  { category_id: "05", category_name: "Entertainment" },
  { category_id: "06", category_name: "Culture" },
  { category_id: "07", category_name: "Arts" },
  { category_id: "08", category_name: "All News" },
];

export const defaultNews = [
  {
    _id: "0282e0e58a5c404fbd15261f11c2ab6a",
    category_id: "01",
    title: "Global Tech Leaders Pledge $100B in Clean Energy & Next-Gen Autonomous AI Infrastructure",
    details: `A historic multilateral coalition of technology giants, renewable energy consortiums, and sovereign wealth funds announced an unprecedented $100 billion investment initiative focused on sustainable artificial intelligence data hubs and modular nuclear energy grids.

The agreement, forged across three continents, aims to decouple rapid computational growth from carbon emissions while accelerating scientific discovery in fusion energy, synthetic biology, and global climate modeling.

Editorial analysts at The Dragon Dispatch note that this landmark commitment marks a strategic transition from speculative AI experimentation to sovereign-scale industrial infrastructure, reshuffling the international energy and compute landscape for the next three decades.`,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    author: {
      name: "Marcus Vance",
      published_date: "Today, 6:00 AM EST",
      img: "/assets/demo-user.png",
    },
    rating: { number: 4.9 },
    total_view: 18450,
  },
  {
    _id: "news_02_space_treaty",
    category_id: "01",
    title: "Historic Commercial Space Accord Establishes Lunar Mining & Orbital Salvage Framework",
    details: `Delegates from forty-two nations ratified the Artemis Commercial Framework in Geneva this morning, establishing clear property rights, environmental safeguards, and salvage dispute protocols for deep-space resource extraction.

The treaty specifically addresses water ice extraction at the lunar south pole and sets up an international registry for debris removal in low Earth orbit. Private aerospace consortia welcomed the legal certainty, with several commercial lunar prospectors announcing mission dates for late 2027.`,
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    author: {
      name: "Elena Rostova",
      published_date: "Today, 7:15 AM EST",
      img: "/assets/user.png",
    },
    rating: { number: 4.8 },
    total_view: 14210,
  },
  {
    _id: "news_03_biotech_crispr",
    category_id: "01",
    title: "Breakthrough Gene-Editing Clinical Trial Reverses Inherited Cardiac Disease in Human Trials",
    details: `Cardiology researchers at the Cambridge Institute for Genomic Medicine announced complete therapeutic remission in 94% of patients participating in a phase-three clinical trial for hypertrophic cardiomyopathy.

Utilizing targeted epigenetic silencing rather than double-strand DNA cutting, the one-time intravenous therapy safely restored normal cardiac muscle protein transcription without off-target chromosomal mutations. Health regulatory bodies have granted the therapy accelerated breakthrough status.`,
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
    author: {
      name: "Dr. Sarah Chen",
      published_date: "Yesterday, 4:40 PM EST",
      img: "/assets/user.png",
    },
    rating: { number: 5.0 },
    total_view: 21390,
  },
  {
    _id: "news_04_quantum_encryption",
    category_id: "02",
    title: "Global Financial Clearhouses Complete First Post-Quantum Cryptographic Migration",
    details: `Major global clearinghouses and central banking settlement networks successfully concluded the largest coordinated cybersecurity overhaul in financial history, transitioning core transfer mechanisms to lattice-based post-quantum cryptography standards.

The milestone insulates multi-trillion dollar daily cross-border flows against future decryption threats from fault-tolerant quantum computers, establishing a resilient blueprint for enterprise infrastructure worldwide.`,
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    author: {
      name: "Julian Thorne",
      published_date: "Oct 13, 2026",
      img: "/assets/demo-user.png",
    },
    rating: { number: 4.7 },
    total_view: 9840,
  },
  {
    _id: "news_05_deep_sea_expedition",
    category_id: "03",
    title: "Pacific Abyssal Trench Expedition Discovers Over 800 Previously Unknown Deep-Sea Organisms",
    details: `A joint international marine oceanography team mapping the Kermadec Trench documented an astonishing biodiversity hotspot at depths exceeding 8,000 meters.

Using autonomous robotic submersibles equipped with high-resolution holographic cameras and gentle suction samplers, scientists identified bioluminescent cephalopods, giant amphipods, and novel microbial colonies metabolizing serpentinite rock emissions.`,
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    author: {
      name: "Aria Lindqvist",
      published_date: "Oct 12, 2026",
      img: "/assets/user.png",
    },
    rating: { number: 4.9 },
    total_view: 16500,
  },
  {
    _id: "news_06_sports_aerodynamics",
    category_id: "04",
    title: "Electric Formula Grand Prix Unveils Active-Aerodynamic Chassis for Next Championship Season",
    details: `Motorsport regulators showcased the Gen-4 electric racing chassis featuring computer-controlled shape-morphing wings, dual front-and-rear regenerative drivetrains generating 600kW, and sustainable bio-composite body panels made from flax fiber and recycled resin.

Simulations show lap times rivaling Formula One while producing net-zero race weekend emissions across European and Asian city circuits.`,
    image_url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
    author: {
      name: "Dante Morales",
      published_date: "Oct 11, 2026",
      img: "/assets/demo-user.png",
    },
    rating: { number: 4.6 },
    total_view: 11200,
  },
  {
    _id: "news_07_entertainment_cinema",
    category_id: "05",
    title: "Independent Film Festival Spotlights Groundbreaking Hybrid Virtual-Production Cinema",
    details: `The 2026 Venice Biennale contemporary cinema awards recognized director Maya Lin's speculative sci-fi epic 'Chronos Drift', which combined photorealistic real-time LED volume projection, practical miniature cinematography, and AI neural rendering on an independent budget of under $15 million.`,
    image_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    author: {
      name: "Sofia Coppola-Cruz",
      published_date: "Oct 10, 2026",
      img: "/assets/user.png",
    },
    rating: { number: 4.8 },
    total_view: 8400,
  },
  {
    _id: "news_08_art_architecture",
    category_id: "06",
    title: "Timber Megastructures and Living Biophilic Architecture Reshape Metropolitan Skylines",
    details: `Cities across Scandinavia, Japan, and Canada are breaking ground on 30-story mass-timber residential high-rises engineered with cross-laminated timber (CLT) and integrated vertical forests.

These carbon-negative structures sequester thousands of tons of atmospheric carbon while providing urban dwellers with superior acoustic insulation, natural air filtration, and daylight optimization.`,
    image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
    author: {
      name: "Kenzo Mori",
      published_date: "Oct 9, 2026",
      img: "/assets/user.png",
    },
    rating: { number: 4.9 },
    total_view: 13700,
  },
];

export async function fetchNewsByCategory(categoryId = "01") {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${categoryId}`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (err) {
    // fallback
  }

  // Graceful fallback: filter by category or return top default stories
  if (categoryId === "08") return defaultNews;
  const filtered = defaultNews.filter((n) => n.category_id === categoryId);
  return filtered.length > 0 ? filtered : defaultNews;
}

export async function fetchNewsById(id) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        return data.data[0];
      }
    }
  } catch (err) {
    // fallback
  }

  // Graceful fallback
  const found = defaultNews.find((n) => n._id === id);
  return found || defaultNews[0];
}
