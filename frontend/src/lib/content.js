// Central content constants used across the experience
export const BRAND = {
  name: "Golden Palm City",
  parent: "Kings Pride",
  tagline: "Live close to nature, closer to happiness",
  whatsappNumber: "917997700031", // international format, no +
  phonePrimary: "+91 79977 00031",
  phoneSecondary: "+91 79977 00032",
  officeAddress:
    "Reti Bowli, Mehdipatnam, Opp. Pillar No. 56, 1st Floor, Saleem Manzil, Padmanabha Nagar, Hyderabad",
  siteLocation: "Shadnagar, Rangareddyguda",
};

export const NAV_LINKS = [
  { id: "discovery", label: "Discovery" },
  { id: "environment", label: "Environment" },
  { id: "transformation", label: "Transformation" },
  { id: "projects", label: "Projects" },
  { id: "trust", label: "Trust" },
];

export const HERO = {
  overline: "India's first cinematic future-land",
  title: "Escape the chaos.",
  titleAccent: "Discover tomorrow early.",
  sub: "A peaceful futuristic sanctuary emerging in the Golden Palm City of Shadnagar — discovered before the rest of the world arrives.",
  cta: "Continue Your Journey",
};

export const ACTS = [
  {
    no: "01",
    label: "Discovery",
    title: "Tomorrow, discovered early.",
    body:
      "Beyond the noise of the present, a calmer geography breathes — palm-lined boulevards, monumental architecture, and golden-hour silence shaped for those who arrive first.",
  },
  {
    no: "02",
    label: "Vision",
    title: "A visionary luxury ecosystem.",
    body:
      "Not a project. A future-city. Designed around peaceful living, eco-futuristic landscaping, and architectural breath — for legacies that outlive trends.",
  },
  {
    no: "03",
    label: "Transformation",
    title: "The future, becoming visible.",
    body:
      "Infrastructure rises slowly, intentionally. Each boulevard, each water reflection, each villa — composed like cinema. The city does not arrive; it unfolds.",
  },
  {
    no: "04",
    label: "Ownership",
    title: "Belonging, before the world catches up.",
    body:
      "Imagine evenings under palm shadows, family stories framed by horizon depth, and an asset that quietly appreciates while others rush. This is early ownership of tomorrow.",
  },
];

export const TRUST_FACTS = [
  { label: "Distance from Bangalore Highway", value: "1 KM" },
  { label: "Surveillance", value: "24/7 CCTV" },
  { label: "Infrastructure", value: "Transformer & Street Lights" },
  { label: "Perimeter", value: "Overall Precast Wall" },
  { label: "Approvals", value: "RERA · HMDA" },
  { label: "Starting From", value: "₹5,000 / sq.yd" },
];

export const ASSETS = {
  hero:
    "https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/0jqwwqds_Hero%20section.png",
  envBoulevard:
    "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/896f0c5c73a9e5a00c3abfaa2af3069c10b20610ecf0ceaf959d28906546262b.png",
  lifestyle:
    "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/ca8072070e244c432efd210c4c6e653bf0822d669fa0f02950920d92dff04be0.png",
  duneTexture:
    "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/ea9a4f167dea7e812900d99df9d8ee85691b94edf8f0e6b54e93eee32acc7635.png",
  semiHero:
    "https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/uj7ps9ag_project_1.png",
};

export const buildWhatsAppHref = (message) => {
  const encoded = encodeURIComponent(
    message ||
      "Hello, I would like to discover Golden Palm City — please share details."
  );
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encoded}`;
};
