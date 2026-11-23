import React from 'react';
import { BookOpen, Bookmark } from 'lucide-react';

export type ActiveNavTab = 'home' | 'glossary';

interface NavbarProps {
  activeTab: ActiveNavTab;
  onGoHome: () => void;
  onGoGlossary: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onGoHome,
  onGoGlossary,
  onOpenSaved,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1E2E54] bg-[#081023]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Right side: Brand */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex shrink-0 items-center gap-3 text-right transition-opacity hover:opacity-90 focus:outline-none"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#10B981]/50 bg-[#059669]/20 text-[#10B981]">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-semibold tracking-normal text-white sm:text-2xl">
            فتاویٰ رضویہ
          </span>
        </button>

        {/* Center: Navigation Links */}
        <nav
          aria-label="بنیادی مینیو"
          className="flex items-center gap-5 sm:gap-8"
        >
          <button
            type="button"
            onClick={onGoHome}
            className={`whitespace-nowrap border-b-2 px-1 py-2 text-base sm:text-lg transition-colors ${
              activeTab === 'home'
                ? 'border-[#10B981] text-[#10B981]'
                : 'border-transparent text-[#CBD5E1] hover:text-white'
            }`}
          >
            مکمل ۳۰ جلدیں
          </button>
          <button
            type="button"
            onClick={onGoGlossary}
            className={`whitespace-nowrap border-b-2 px-1 py-2 text-base sm:text-lg transition-colors ${
              activeTab === 'glossary'
                ? 'border-[#10B981] text-[#10B981]'
                : 'border-transparent text-[#CBD5E1] hover:text-white'
            }`}
          >
            فقہی اصطلاحات
          </button>
        </nav>

        {/* Left side: Prominent Green Button matching screenshot */}
        <button
          type="button"
          onClick={onOpenSaved}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-[#059669] px-4 py-2 text-base text-white shadow-lg shadow-[#059669]/25 transition-colors hover:bg-[#10B981] sm:px-5 sm:py-2.5 sm:text-lg"
        >
          <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          <span>محفوظ مسائل</span>
          {savedCount > 0 && (
            <span className="tabular-nums rounded-md bg-[#064E3B] px-2 py-0.5 text-sm text-white">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
