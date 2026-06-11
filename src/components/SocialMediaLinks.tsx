import { Linkedin, Twitter, Globe } from 'lucide-react';

interface SocialMediaLinksProps {
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export const SocialMediaLinks = ({
  twitter = 'https://x.com',
  linkedin = 'https://linkedin.com',
  website = 'https://example.com'
}: SocialMediaLinksProps) => (
  <div className="flex items-center justify-center gap-3 px-3 py-4 border-t border-gray-700">
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-400 transition-colors rounded-lg hover:text-blue-500 hover:bg-gray-700/50"
      aria-label="Visit website"
      title="Website"
    >
      <Globe className="w-5 h-5" />
    </a>
    <a
      href={twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-400 transition-colors rounded-lg hover:text-blue-400 hover:bg-gray-700/50"
      aria-label="Follow on X/Twitter"
      title="X (Twitter)"
    >
      <Twitter className="w-5 h-5" />
    </a>
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-400 transition-colors rounded-lg hover:text-blue-600 hover:bg-gray-700/50"
      aria-label="Connect on LinkedIn"
      title="LinkedIn"
    >
      <Linkedin className="w-5 h-5" />
    </a>
  </div>
);
