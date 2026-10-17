import type { BusinessSlug } from "@/lib/business-slugs";
import { OWNER_CONTACTS } from "@/lib/owner-contacts";

export function inquiryDestinationEmail(
  type: string,
  businessSlug?: string | null,
): string | undefined {
  switch (businessSlug as BusinessSlug | undefined) {
    case "old-north-end-tattoos":
      return OWNER_CONTACTS.tattooEntrance.email;
    case "ross-squad-djs-event-rentals":
      return OWNER_CONTACTS.djEvents.email;
    case "el-gringos-tacos":
    case "tequila-chilladas-bar":
      return OWNER_CONTACTS.campus.email;
    case "trims-barbershop":
      return OWNER_CONTACTS.projectEmail;
    default:
      break;
  }
  if (type === "tattoo") return OWNER_CONTACTS.tattooEntrance.email;
  if (type === "dj_event") return OWNER_CONTACTS.djEvents.email;
  if (type === "food" || type === "bar_event") return OWNER_CONTACTS.campus.email;
  if (type === "barber") return OWNER_CONTACTS.projectEmail;
  return OWNER_CONTACTS.projectEmail;
}
