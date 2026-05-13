interface AntennaMarkerProps {
  className?: string;
  active?: boolean;
}

export function AntennaMarker({ className = "", active = false }: AntennaMarkerProps) {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 2 L12 7 L16 2"
        stroke={active ? "var(--cinefill-amber)" : "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.6}
      />
      <rect
        x="3"
        y="8"
        width="18"
        height="16"
        rx="4"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
