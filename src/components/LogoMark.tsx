/**
 * Data Signal logo mark — an oscilloscope/ECG waveform inside a dark screen badge.
 * Deliberately different from Supabase (no lightning bolt, no solid-color fill).
 * The "signal monitor" concept directly represents the brand name.
 */
type Props = { size?: number };

export default function LogoMark({ size = 30 }: Props) {
  const r = Math.round(size * 0.27); // border radius
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Screen/monitor body */}
      <rect width="30" height="30" rx={r} fill="#070D1C" />
      <rect width="30" height="30" rx={r} fill="url(#screen-grad)" />
      {/* Subtle border glow */}
      <rect x="0.5" y="0.5" width="29" height="29" rx={r - 0.5} stroke="#E25A1C" strokeOpacity="0.35" strokeWidth="1" fill="none" />

      {/* ECG / pulse waveform — the "signal" */}
      {/* Flat → sharp spike up → flat → smaller spike → flat */}
      <polyline
        points="2,15  7,15  8.5,9  10,21  11.5,7  13,21  14.5,15  28,15"
        stroke="#E25A1C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Trailing glow on the waveform */}
      <polyline
        points="2,15  7,15  8.5,9  10,21  11.5,7  13,21  14.5,15  28,15"
        stroke="#E25A1C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.15"
      />

      {/* Scan line — subtle horizontal line behind the waveform */}
      <line x1="2" y1="15" x2="28" y2="15" stroke="#1A2A40" strokeWidth="0.5" />

      {/* Blinking cursor dot at the end */}
      <circle cx="28" cy="15" r="1.2" fill="#E25A1C" opacity="0.9" />

      <defs>
        <linearGradient id="screen-grad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D1A30" />
          <stop offset="100%" stopColor="#070D1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
