import { Button } from "@/components/ui/Button";
import { phoneHref, smsHref } from "@/lib/format";

export function BusinessContactActions({
  phone,
  phoneDisplay,
  consultationHref = "#inquiry",
}: {
  phone: string;
  phoneDisplay?: string;
  consultationHref?: string;
}) {
  const label = phoneDisplay ?? phone;
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Button href={phoneHref(phone)} variant="primary" className="justify-center">
        Call {label}
      </Button>
      <Button href={smsHref(phone)} variant="outline" className="justify-center">
        Text
      </Button>
      <Button href={consultationHref} variant="outline" className="justify-center border-[var(--brass)] text-[var(--brass)]">
        Request a consultation
      </Button>
    </div>
  );
}
