import Tile from "@/components/bento/Tile";
import { cn } from "@/lib/utils";

/**
 * Backwards-compatible wrapper: blog pages use Card; implementation is Tile (glass + gradient border).
 */
export function Card({ children, className }) {
  return (
    <Tile className={cn(className)}>{children}</Tile>
  );
}
