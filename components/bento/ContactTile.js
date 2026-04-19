import Tile from "@/components/bento/Tile";
import { Button } from "@/components/ui/Button";

const CALENDAR_URL = "https://calendar.app.google/FVusmLYUTdkxdEKQA";

export default function ContactTile({ basics, contact }) {
  const email = basics.email;

  return (
    <Tile label="contact" id="contact">
      <p className="text-sm text-[var(--muted)]">
        {contact.availability} · {contact.timezone}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {email ? (
          <Button href={`mailto:${email}`} size="sm">
            Email
          </Button>
        ) : null}
        <Button href={CALENDAR_URL} variant="secondary" size="sm">
          Schedule
        </Button>
      </div>
    </Tile>
  );
}
