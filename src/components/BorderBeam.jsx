/** Magic UI–style border beam without Motion dependency */
export function BorderBeam({
  size = 56,
  duration = 7,
  colorFrom = "#c8ff3d",
  colorTo = "#f2ebe3",
  borderWidth = 1.5,
}) {
  return (
    <div
      className="border-beam"
      style={{
        "--beam-size": `${size}px`,
        "--beam-duration": `${duration}s`,
        "--beam-from": colorFrom,
        "--beam-to": colorTo,
        "--beam-width": `${borderWidth}px`,
      }}
      aria-hidden="true"
    >
      <span className="border-beam-glow" />
    </div>
  );
}
