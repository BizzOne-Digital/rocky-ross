export type SupplementBlock = {
  title: string;
  items: string[];
};

export type BusinessSupplement = {
  highlights: SupplementBlock;
  goodToKnow: SupplementBlock;
  experience?: string;
};

const SUPPLEMENTS: Record<string, BusinessSupplement> = {
  "old-north-end-tattoos": {
    highlights: {
      title: "What we do",
      items: [
        "Custom tattooing with a consultation-first approach",
        "Walk-in availability when artists have openings — ask on arrival",
        "Request form for ideas, placement, size, and preferred artist",
        "Located inside Inked & Infused on N Weber St.",
      ],
    },
    goodToKnow: {
      title: "Before you visit",
      items: [
        "Submitting a request does not confirm an appointment",
        "Bring reference images and ID; minors require guardian presence per shop policy",
        "Hours and artist schedules publish here when set in admin",
      ],
    },
    experience:
      "Whether it is your first piece or your next session, we focus on clear communication before ink meets skin.",
  },
  "el-gringos-tacos": {
    highlights: {
      title: "At the table",
      items: [
        "Street-style tacos and bold plates for the Inked & Infused crowd",
        "Readable menu with categories — specials rotate in admin",
        "Eat on property before or after tattoos, drinks, or a fresh cut",
        "Sold-out items and pricing update live when entered by the team",
      ],
    },
    goodToKnow: {
      title: "Good to know",
      items: [
        "Menu items and prices appear on this page once confirmed — not placeholder numbers",
        "Ask about specials and seasonal items at the window",
        "Part of the same address as the rest of the destination",
      ],
    },
    experience: "Flavor-forward, casual, and built for people who linger — tacos are the heartbeat of the property.",
  },
  "tequila-chilladas-bar": {
    highlights: {
      title: "Behind the bar",
      items: [
        "Tequila-forward cocktails and chillada energy on-property",
        "Drink categories and features publish from admin when ready",
        "Pair a pour with tacos from El Gringo's or a night out with friends",
        "Private event inquiries welcome — use the form below",
      ],
    },
    goodToKnow: {
      title: "Drink responsibly",
      items: [
        "Happy hour and promotions display here when verified in admin",
        "Valid ID required; service follows local regulations",
        "No invented drink prices on this site — only what the team publishes",
      ],
    },
    experience: "A moody, social stop designed for tequila lovers and cocktail explorers alike.",
  },
  "trims-barbershop": {
    highlights: {
      title: "Grooming focus",
      items: [
        "Barbering and sharp cuts coming to Inked & Infused",
        "Services and pricing list here when Trims is open and published",
        "Booking links or request forms activate when the team is ready",
        "Same destination — tattoos, tacos, tequila, and fresh cuts",
      ],
    },
    goodToKnow: {
      title: "Status",
      items: [
        "Opening timeline is managed in admin — we do not publish guessed dates",
        "Watch this page for hours and barber profiles when available",
        "General questions can go through the inquiry form",
      ],
    },
    experience: "Clean lines, classic barber craft, and the same creative energy as the rest of the property.",
  },
  "ross-squad-djs-event-rentals": {
    highlights: {
      title: "Events we serve",
      items: [
        "Weddings, private parties, corporate functions, and nightlife",
        "DJ performance — not limited to the Inked & Infused building",
        "Sound, lighting, and equipment rentals with custom gear lists",
        "Packages and rates publish here when confirmed in admin",
      ],
    },
    goodToKnow: {
      title: "How booking works",
      items: [
        "Inquiries are requests — not automatic holds or confirmations",
        "Share date, venue, guest count, and DJ vs. rental needs",
        "Travel across Colorado Springs and the region — venue varies by event",
      ],
    },
    experience:
      "From intimate celebrations to high-energy dance floors, Ross Squad brings production muscle and personality to your night.",
  },
};

export function getBusinessSupplement(slug: string): BusinessSupplement | null {
  return SUPPLEMENTS[slug] ?? null;
}
