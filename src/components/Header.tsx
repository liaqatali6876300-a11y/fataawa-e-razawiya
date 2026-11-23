interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onJumpToSection: (sectionId: string) => void;
  onFocusSearch: () => void;
}

export function Header({
  savedCount,
  onOpenSaved,
  onJumpToSection,
  onFocusSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/90 bg-[#FBF9F5]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onJumpToSection('top');
          }}
          className="font-nastaliq shrink-0 whitespace-nowrap text-2xl font-bold text-[#0F0D0B] transition-colors hover:text-[#14532D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D] sm:text-[1.8rem]"
        >
          موسوعہ فتاویٰ رضویہ
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="بنیادی رہنمائی"
          className="hidden items-center gap-6 text-base font-bold text-stone-800 md:flex lg:text-lg"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('top');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#14532D] hover:underline hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
          >
            تعارف
          </a>
          <a
            href="#main-search"
            onClick={(e) => {
              e.preventDefault();
              onFocusSearch();
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#14532D] hover:underline hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
          >
            تلاشِ مسائل
          </a>
          <a
            href="#chapters-workspace"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('chapters-workspace');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#14532D] hover:underline hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
          >
            ابوابِ فقہ
          </a>
          <a
            href="#volumes-map"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('volumes-map');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#14532D] hover:underline hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
          >
            نقشۂ جلدیں
          </a>
          <a
            href="#glossary-section"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('glossary-section');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#14532D] hover:underline hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
          >
            فقہی لغت
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenSaved}
            className="min-h-[46px] shrink-0 whitespace-nowrap rounded-md bg-[#14532D] px-5 py-2 text-base font-bold text-[#FBF9F5] transition-colors hover:bg-[#114224] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] lg:text-lg"
          >
            {savedCount > 0 ? `محفوظ مسائل (${savedCount})` : 'محفوظ مسائل'}
          </button>
        </div>
      </div>
    </header>
  );
}
