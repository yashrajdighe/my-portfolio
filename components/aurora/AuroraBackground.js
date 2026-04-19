/**
 * Static ambient background — soft radial tints for depth over the slate canvas.
 */
export default function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 50% -10%, rgba(156, 186, 255, 0.12), transparent 55%),
            radial-gradient(ellipse 70% 45% at 100% 60%, rgba(122, 160, 245, 0.07), transparent 52%),
            radial-gradient(ellipse 60% 40% at 0% 95%, rgba(255, 255, 255, 0.03), transparent 55%),
            var(--bg)
          `,
        }}
      />
    </div>
  );
}
