export default function RagLogo({ size = 24, className = '' }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 3 data nodes */}
      <rect x="4" y="5" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="4" y="10" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="4" y="15" width="4" height="4" rx="1" fill="currentColor" />
      
      {/* Converging lines */}
      <path d="M9 7L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 17L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Solid block (Answer) */}
      <rect x="15" y="8" width="6" height="8" rx="1.5" fill="currentColor" />
    </svg>
  );
}
