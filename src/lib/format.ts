export function formatMoney(minor: number | null | undefined, currency = "USD"): string | null {
  if (minor === null || minor === undefined) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(minor / 100);
}

export function formatServicePrice(service: {
  priceMode: string;
  priceMinor?: number | null;
  currency?: string;
}): string {
  const money = formatMoney(service.priceMinor ?? null, service.currency ?? "USD");
  switch (service.priceMode) {
    case "fixed":
      return money ?? "Quote";
    case "starting":
      return money ? `From ${money}` : "Starting price on request";
    case "quote":
      return "Quote on request";
    case "hidden":
    default:
      return "";
  }
}

export function mapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+${digits.startsWith("1") ? digits : `1${digits}`}` : "#";
}

export function smsHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits.slice(-10);
  return ten.length === 10 ? `sms:+1${ten}` : "#";
}

export function escapeCsvCell(value: string): string {
  const safe = value.replace(/\r?\n/g, " ");
  if (/^[=+\-@]/.test(safe)) {
    return `"'${safe.replace(/"/g, '""')}"`;
  }
  if (safe.includes(",") || safe.includes('"')) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}
