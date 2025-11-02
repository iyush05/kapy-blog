// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Copyright */}
          <div className="space-y-3">
            <Image src="/kapybara_logo.jpeg" alt='logo' height={35} width={50} />
            <h3 className="text-lg font-semibold text-gray-900">KapyBlog</h3>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} My App. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://x.com/iyush05" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://x.com/iyush05" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="https://x.com/iyush05" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="https://x.com/iyush05" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Tagline */}
          <div className="space-y-3">
            <p className="text-sm text-gray-600 italic">
              Building simple, beautiful experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/iyush05"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.25c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53A8.35 8.35 0 0022 5.92a8.14 8.14 0 01-2.36.65 4.1 4.1 0 001.8-2.27 8.2 8.2 0 01-2.6.99 4.1 4.1 0 00-7 3.74 11.64 11.64 0 01-8.45-4.29 4.1 4.1 0 001.27 5.47c-.68-.02-1.32-.2-1.88-.52v.05c0 1.98 1.4 3.63 3.27 4.01-.34.09-.7.14-1.07.14-.26 0-.51-.03-.76-.07.51 1.6 2 2.76 3.76 2.79a8.22 8.22 0 01-5.08 1.75c-.33 0-.66-.02-.98-.06a11.6 11.6 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://github.com/iyush05/kapy-blog"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .3C5.4.3.3 5.4.3 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2 1 .2-1.5.8-1.2 1-1.5-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 013 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C23.7 5.4 18.6.3 12 .3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          Made with <span className="text-red-500">♥</span> by @iyush05
        </div>
      </div>
    </footer>
  );
};

export default Footer;