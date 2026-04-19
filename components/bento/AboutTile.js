import Tile from "@/components/bento/Tile";
import { Badge } from "@/components/ui/Badge";
import { pickKeyTools } from "@/lib/pickKeyTools";
import { cn } from "@/lib/utils";

export default function AboutTile({ basics, summary, stack, className }) {
  const paragraphs = Array.isArray(summary) ? summary.filter(Boolean) : [];
  const bio = paragraphs[0] ?? "";
  const chips = pickKeyTools(stack, 4);

  return (
    <Tile label="about" className={cn("md:col-span-2", className)} id="about">
      {bio ? (
        <p className="text-sm leading-relaxed text-[var(--fg)] md:text-[15px] md:leading-7">
          {bio}
        </p>
      ) : null}
      {chips.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((tool) => (
            <Badge key={tool} variant="outline">
              {tool}
            </Badge>
          ))}
        </div>
      ) : null}
    </Tile>
  );
}
