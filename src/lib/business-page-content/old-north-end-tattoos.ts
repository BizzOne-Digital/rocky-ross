import { OWNER_CONTACTS } from "@/lib/owner-contacts";

export const OLD_NORTH_END_PHONE_DISPLAY = "719-321-7262";
export const OLD_NORTH_END_PHONE_RAW = "7193217262";

export const OLD_NORTH_END_ADDRESS = OWNER_CONTACTS.tattooEntrance.address;
export const OLD_NORTH_END_EMAIL = OWNER_CONTACTS.tattooEntrance.email;

export const OLD_NORTH_END_AFTERCARE_IMAGE =
  "/images/old-north-end-tattoos/Old-North-End-Tattoos-Aftercare-Letter.jpg";

export const OLD_NORTH_END_HOURS = [
  "Monday–Thursday: 11:00 AM – 9:00 PM",
  "Friday–Saturday: 11:00 AM – 10:00 PM",
  "Sunday: 11:00 AM – 7:00 PM",
] as const;

export const OLD_NORTH_END_STYLES = [
  "Traditional",
  "Black and gray",
  "Fine line",
  "Anime",
  "Patchwork",
  "Oversized pieces",
  "Coverups",
  "Tattoo refresh work",
] as const;

export const OLD_NORTH_END_INFECTION_WARNING =
  "If you think your tattoo may be infected, please contact us so we can support you and review your aftercare. See a doctor promptly for any suspected infection. If symptoms are severe or worsening, or you cannot reach us right away, seek medical care immediately. Do not wait for our reply.";

export const OLD_NORTH_END_WARNING_SIGNS =
  "Warning signs: spreading redness, worsening pain or swelling, pus, fever or chills.";

/** Readable text companion to the aftercare letter image (US Letter). */
export const OLD_NORTH_END_AFTERCARE_TEXT = {
  tagline: "Good aftercare = better healing = better tattoo",
  traditional: [
    "Wash your tattoo 2–3 times a day with lukewarm water and mild, fragrance-free soap. Use clean hands and gentle motions.",
    "Rinse thoroughly and gently pat dry with a clean paper towel. Do not rub.",
    "Apply a thin layer of fragrance-free tattoo aftercare ointment or lotion. Less is more.",
    "Keep your tattoo out of direct sun. No swimming, hot tubs, or soaking in baths until fully healed.",
    "Wear loose, clean clothing. Do not pick, scratch, or peel. Healing takes about 2–4 weeks.",
  ],
  secondSkinNote: "Avoid second skin if you have an adhesive or bandage allergy.",
  secondSkin: [
    "Leave film on per your artist and the manufacturer wear time.",
    "Remove gently in the shower; let warm water run over the film and peel slowly.",
    "Wash with lukewarm water and mild, fragrance-free soap. Rinse and pat dry.",
    "Apply a thin layer of fragrance-free aftercare lotion.",
    "Continue the same care as traditional healing for the next 2–4 weeks.",
  ],
  whatToExpect: [
    "Slight redness, swelling, and tenderness are normal.",
    "Peeling or flaking is normal — do not pick or peel.",
  ],
  infection: OLD_NORTH_END_INFECTION_WARNING,
  warningSigns: OLD_NORTH_END_WARNING_SIGNS,
  footer: "Old North End Tattoos LLC · 719-321-7262",
} as const;
