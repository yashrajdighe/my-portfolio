import Tile from "@/components/bento/Tile";
import { Badge } from "@/components/ui/Badge";
import { flattenStackTools } from "@/lib/pickKeyTools";

export default function StackTile({ stack }) {
  const tools = flattenStackTools(stack, 8);

  return (
    <Tile label="stack" id="stack">
      {tools.length ? (
        <div className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">—</p>
      )}
    </Tile>
  );
}
