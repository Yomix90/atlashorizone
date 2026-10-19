import type { SocialPlatform } from '@/lib/types';

/** Pictogrammes simplifiés des réseaux sociaux (lucide-react n'inclut plus les logos de marques). */
export function SocialIcon({ platform, className = 'h-5 w-5' }: { platform: SocialPlatform; className?: string }) {
  const common = { viewBox: '0 0 24 24', className, 'aria-hidden': true, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (platform) {
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
        </svg>
      );
    case 'x':
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
          <path d="M14 3c.5 2.5 2.5 4.5 5 4.5" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M11 8.5h2.5a2.5 2.5 0 0 1 0 5H11M11 8.5V19" />
        </svg>
      );
    case 'tripadvisor':
    default:
      return (
        <svg {...common}>
          <circle cx="7.5" cy="13" r="3.5" />
          <circle cx="16.5" cy="13" r="3.5" />
          <path d="M4 8.5C6.5 7 9 6.5 12 6.5s5.5.5 8 2M12 6.5V9" />
        </svg>
      );
  }
}

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X',
  tripadvisor: 'Tripadvisor',
  linkedin: 'LinkedIn',
  pinterest: 'Pinterest',
};
