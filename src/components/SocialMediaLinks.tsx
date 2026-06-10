import { Instagram, Music } from 'lucide-react';

interface SocialMediaLinksProps {
  instagram?: string;
  tiktok?: string;
}

export const SocialMediaLinks = ({
  instagram = 'https://instagram.com',
  tiktok = 'https://tiktok.com'
}: SocialMediaLinksProps) => (
  <div className="flex items-center justify-center gap-4 px-3 py-4 border-t border-gray-700">
    <a
      href={instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-400 transition-colors rounded-lg hover:text-pink-500 hover:bg-gray-700/50"
      aria-label="Follow on Instagram"
    >
      <Instagram className="w-5 h-5" />
    </a>
    <a
      href={tiktok}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700/50"
      aria-label="Follow on TikTok"
    >
      <Music className="w-5 h-5" />
    </a>
  </div>
);
