import { useMemo, useState } from 'react';
import {
  Bookmark,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Search,
  X,
} from 'lucide-react';
import { Chapter, Masala } from '../types/fatawa';
import { ArchivalImage } from './ArchivalImage';

export type ReadingMode = 'single' | 'full';
export type FontScale = 'sm' | 'md' | 'lg';

interface ChapterReaderWorkspaceProps {
  chapters: Chapter[];
  activeChapterId: string;
  activeMasalaId: string;
  savedMasalaIds: string[];
  studiedChapterIds: string[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectChapter: (chapterId: string, masalaId?: string) => void;
  onSelectMasala: (masalaId: string) => void;
  onToggleSaveMasala: (masalaId: string) => void;
  onToggleStudiedChapter: (chapterId: string) => void;
}

const FONT_SIZE_CLASSES: Record<FontScale, string> = {
  sm: 'text-[22px] sm:text-[27px] font-bold leading-[2.0]',
  md: 'text-[26px] sm:text-[33px] font-bold leading-[2.05]',
  lg: 'text-[30px] sm:text-[40px] font-bold leading-[2.1]',
};

export function ChapterReaderWorkspace({
  chapters,
  activeChapterId,
  activeMasalaId,
  savedMasalaIds,
  studiedChapterIds,
  searchQuery,
  onSearchChange,
  onSelectChapter,
  onSelectMasala,
  onToggleSaveMasala,
  onToggleStudiedChapter,
}: ChapterReaderWorkspaceProps) {
  const [readingMode, setReadingMode] = useState<ReadingMode>('single');
  const [fontScale, setFontScale] = useState<FontScale>('lg');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeChapterIndex = useMemo(
    () => Math.max(0, chapters.findIndex((c) => c.id === activeChapterId)),
    [chapters, activeChapterId]
  );

  const activeChapter = chapters[activeChapterIndex] ?? chapters[0];

  const activeMasalaIndex = useMemo(() => {
    const idx = activeChapter.masail.findIndex((m) => m.id === activeMasalaId);
    return idx >= 0 ? idx : 0;
  }, [activeChapter, activeMasalaId]);

  const activeMasala =
    activeChapter.masail[activeMasalaIndex] ?? activeChapter.masail[0];

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const results: Array<{ chapter: Chapter; masala: Masala }> = [];
    for (const chapter of chapters) {
      const chapterMatches =
        chapter.urduTitle.toLowerCase().includes(normalizedQuery) ||
        chapter.arabicTitle.toLowerCase().includes(normalizedQuery) ||
        chapter.romanKeywords.some((k) =>
          k.toLowerCase().includes(normalizedQuery)
        );

      for (const masala of chapter.masail) {
        const masalaMatches =
          chapterMatches ||
          masala.title.toLowerCase().includes(normalizedQuery) ||
          masala.question.toLowerCase().includes(normalizedQuery) ||
          masala.easyExplanation.some((p) =>
            p.toLowerCase().includes(normalizedQuery)
          ) ||
          masala.keywords.some((k) => k.toLowerCase().includes(normalizedQuery));

        if (masalaMatches) {
          results.push({ chapter, masala });
        }
      }
    }
    return results;
  }, [chapters, normalizedQuery]);

  const handleCopyMasala = async (chapter: Chapter, masala: Masala) => {
    const formatted = [
      `فتاویٰ رضویہ — آسان اردو خلاصہ`,
      `${chapter.urduTitle} (${chapter.volumeSpan})`,
      `مسئلہ: ${masala.title}`,
      `شرعی حکم: ${masala.ruling}`,
      ``,
      `سوال: ${masala.question}`,
      ``,
      `وضاحت:`,
      ...masala.easyExplanation,
      ``,
      `عملی رہنمائی: ${masala.practicalTakeaway}`,
      `حوالہ: ${masala.reference}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedId(masala.id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard API fallback ignored silently in restricted frames
    }
  };

  const handlePrevMasala = () => {
    if (activeMasalaIndex > 0) {
      onSelectMasala(activeChapter.masail[activeMasalaIndex - 1].id);
    } else if (activeChapterIndex > 0) {
      const prevChapter = chapters[activeChapterIndex - 1];
      const lastMasala = prevChapter.masail[prevChapter.masail.length - 1];
      onSelectChapter(prevChapter.id, lastMasala.id);
    }
  };

  const handleNextMasala = () => {
    if (activeMasalaIndex < activeChapter.masail.length - 1) {
      onSelectMasala(activeChapter.masail[activeMasalaIndex + 1].id);
    } else if (activeChapterIndex < chapters.length - 1) {
      const nextChapter = chapters[activeChapterIndex + 1];
      onSelectChapter(nextChapter.id, nextChapter.masail[0].id);
    }
  };

  const masailToDisplay =
    readingMode === 'full' ? activeChapter.masail : [activeMasala];

  const isStudied = studiedChapterIds.includes(activeChapter.id);

  return (
    <section
      id="chapters-workspace"
      className="border-b border-stone-200 bg-[#FBF9F5] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Title + Workspace Toolbar */}
        <div className="mb-8 border-b border-stone-200 pb-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-base font-bold text-stone-600 sm:text-lg">
                باب در باب مطالعاتی مرکز · مکمل ۱۲ ابواب
              </p>
              <h2 className="font-nastaliq mt-1 text-3xl font-bold text-[#0F0D0B] sm:text-5xl">
                ابوابِ فتاویٰ رضویہ کا آسان اردو مطالعہ
              </h2>
            </div>

            {/* Reading Controls: Mode & Font Scale */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Reading Mode Segmented Control */}
              <div
                role="group"
                aria-label="مطالعے کا انداز"
                className="flex items-center gap-1 rounded-md border border-stone-300 bg-[#F2EDE3] p-1"
              >
                <button
                  type="button"
                  onClick={() => setReadingMode('single')}
                  className={`min-h-[44px] whitespace-nowrap rounded px-4 py-2 text-base font-bold transition-colors ${
                    readingMode === 'single'
                      ? 'bg-[#FBF9F5] text-[#14532D] shadow-xs'
                      : 'text-stone-700 hover:text-[#0F0D0B]'
                  }`}
                >
                  مسئلہ وار مطالعہ
                </button>
                <button
                  type="button"
                  onClick={() => setReadingMode('full')}
                  className={`min-h-[44px] whitespace-nowrap rounded px-4 py-2 text-base font-bold transition-colors ${
                    readingMode === 'full'
                      ? 'bg-[#FBF9F5] text-[#14532D] shadow-xs'
                      : 'text-stone-700 hover:text-[#0F0D0B]'
                  }`}
                >
                  مکمل باب ایک ساتھ
                </button>
              </div>

              {/* Font Scale Control */}
              <div
                role="group"
                aria-label="حروف کا سائز"
                className="flex items-center gap-1 rounded-md border border-stone-300 bg-[#F2EDE3] p-1"
              >
                <button
                  type="button"
                  onClick={() => setFontScale('sm')}
                  className={`min-h-[44px] whitespace-nowrap rounded px-3.5 py-2 text-base font-bold transition-colors ${
                    fontScale === 'sm'
                      ? 'bg-[#FBF9F5] text-[#0F0D0B] shadow-xs'
                      : 'text-stone-700 hover:text-[#0F0D0B]'
                  }`}
                >
                  درمیانہ
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('md')}
                  className={`min-h-[44px] whitespace-nowrap rounded px-3.5 py-2 text-base font-bold transition-colors ${
                    fontScale === 'md'
                      ? 'bg-[#FBF9F5] text-[#0F0D0B] shadow-xs'
                      : 'text-stone-700 hover:text-[#0F0D0B]'
                  }`}
                >
                  بڑا
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('lg')}
                  className={`min-h-[44px] whitespace-nowrap rounded px-3.5 py-2 text-base font-bold transition-colors ${
                    fontScale === 'lg'
                      ? 'bg-[#FBF9F5] text-[#0F0D0B] shadow-xs'
                      : 'text-stone-700 hover:text-[#0F0D0B]'
                  }`}
                >
                  بہت بڑا
                </button>
              </div>
            </div>
          </div>

          {/* Search Input across all chapters (Urdu + Roman Urdu) */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2 text-stone-500"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="مسئلہ یا موضوع تلاش کریں (مثلاً: وضو، زکوٰۃ، طلاق، کرنسی، نماز)..."
                aria-label="مسائل تلاش کریں"
                className="min-h-[58px] w-full rounded-md border-2 border-stone-300 bg-white pr-12 pl-12 text-lg font-bold text-[#0F0D0B] placeholder:font-semibold placeholder:text-stone-400 focus:border-[#14532D] focus:outline-none sm:text-xl"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="تلاش صاف کریں"
                  className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-stone-600 hover:bg-stone-100 hover:text-[#0F0D0B]"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile Chapter Quick Select */}
            <div className="lg:hidden">
              <label htmlFor="mobile-chapter-select" className="sr-only">
                باب منتخب کریں
              </label>
              <select
                id="mobile-chapter-select"
                value={activeChapter.id}
                onChange={(e) => onSelectChapter(e.target.value)}
                className="min-h-[56px] w-full rounded-md border-2 border-stone-300 bg-white px-4 text-lg font-bold text-[#0F0D0B] focus:border-[#14532D] focus:outline-none"
              >
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.numberUrdu}. {ch.urduTitle} ({ch.volumeSpan})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Search Results Panel */}
          {normalizedQuery && (
            <div className="mt-4 rounded-md border border-stone-300 bg-[#F4F0E7] p-5">
              <div className="mb-3 flex items-center justify-between gap-4 border-b border-stone-300 pb-2.5">
                <span className="text-lg font-bold text-[#0F0D0B]">
                  تلاش کے نتائج ({searchResults.length} مسائل ملے)
                </span>
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="text-base font-bold text-[#14532D] hover:underline"
                >
                  تلاش بند کریں
                </button>
              </div>

              {searchResults.length === 0 ? (
                <p className="py-3 text-lg font-semibold text-stone-700">
                  "{searchQuery}" کے متعلق کوئی براہِ راست نتیجہ نہیں ملا۔ کوئی آسان لفظ (جیسے نماز، روزہ، زکوٰۃ، نکاح، سود، یا وراثت) لکھ کر دوبارہ کوشش کریں۔
                </p>
              ) : (
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {searchResults.slice(0, 8).map(({ chapter, masala }) => (
                    <li key={masala.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectChapter(chapter.id, masala.id);
                          onSearchChange('');
                        }}
                        className="flex w-full flex-col items-start rounded-md border border-stone-300 bg-[#FBF9F5] p-4 text-right transition-colors hover:border-[#14532D]/50 hover:bg-white"
                      >
                        <span className="text-sm font-bold text-stone-600 sm:text-base">
                          {chapter.numberUrdu}. {chapter.arabicTitle} ·{' '}
                          {masala.ruling}
                        </span>
                        <span className="mt-1.5 text-lg font-bold text-[#0F0D0B] sm:text-xl">
                          {masala.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Wide 2-Column Editorial Layout (Chapter Index + Spacious Reading Canvas for 40px Urdu) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Column 1 (Right in RTL): Chapter Navigation Index */}
          <aside
            aria-label="فہرستِ ابواب"
            className="hidden lg:col-span-3 lg:block"
          >
            <div className="sticky top-24">
              <div className="mb-3 flex items-center justify-between border-b border-stone-300 pb-3">
                <h3 className="text-base font-bold text-stone-700">
                  فہرستِ ابواب (۱۲ ابواب)
                </h3>
                <span className="tabular-nums text-base font-bold text-stone-600">
                  {studiedChapterIds.length}/{chapters.length} مکمل
                </span>
              </div>

              <nav className="space-y-1.5">
                {chapters.map((chapter) => {
                  const isActive = chapter.id === activeChapter.id;
                  const chapterDone = studiedChapterIds.includes(chapter.id);
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => onSelectChapter(chapter.id)}
                      className={`flex w-full items-start justify-between gap-2.5 rounded-md px-4 py-3.5 text-right transition-colors ${
                        isActive
                          ? 'bg-[#14532D] text-[#FBF9F5]'
                          : 'text-stone-800 hover:bg-[#F2EDE3] hover:text-[#0F0D0B]'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-base font-bold opacity-90">
                          <span className="tabular-nums">
                            {chapter.numberUrdu}.
                          </span>
                          <span className="truncate">{chapter.arabicTitle}</span>
                        </div>
                        <div className="mt-1 text-lg font-bold leading-snug sm:text-xl">
                          {chapter.urduTitle}
                        </div>
                        <div
                          className={`mt-1 text-sm font-semibold ${
                            isActive ? 'text-[#FBF9F5]/85' : 'text-stone-600'
                          }`}
                        >
                          {chapter.volumeSpan} · {chapter.masail.length} مسائل
                        </div>
                      </div>
                      {chapterDone && (
                        <CheckCircle2
                          className={`mt-1 h-5 w-5 shrink-0 ${
                            isActive ? 'text-[#FBF9F5]' : 'text-[#14532D]'
                          }`}
                          aria-label="مطالعہ مکمل"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Column 2 (Left in RTL, Wide 9-col Canvas): Main Explanatory Reading Canvas */}
          <main className="lg:col-span-9">
            {/* Chapter Header Block */}
            <div className="border-b border-stone-300 pb-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 text-base font-bold text-stone-600 sm:text-lg">
                  <span>باب {activeChapter.numberUrdu}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeChapter.arabicTitle}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeChapter.volumeSpan}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleStudiedChapter(activeChapter.id)}
                  className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-base font-bold transition-colors ${
                    isStudied
                      ? 'border-[#14532D] bg-[#14532D]/10 text-[#14532D]'
                      : 'border-stone-400 bg-white text-stone-800 hover:border-stone-500'
                  }`}
                >
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  <span>
                    {isStudied ? 'باب مکمل نشان زدہ' : 'مطالعہ مکمل نشان لگائیں'}
                  </span>
                </button>
              </div>

              <h3 className="font-nastaliq mt-4 text-3xl font-bold text-[#0F0D0B] sm:text-5xl">
                {activeChapter.urduTitle}
              </h3>

              <p className="mt-5 text-xl font-bold leading-[2.05] text-[#1C1917] sm:text-[29px]">
                {activeChapter.introduction}
              </p>

              {activeChapter.id === 'ch-01-intro' && (
                <div className="mt-7">
                  <ArchivalImage
                    src="/src/assets/images/chapter_scholarly_desk_1795460883648.jpg"
                    alt="کلاسیکی عالمِ دین رحل اور دوات قلم کے ساتھ کتبِ فقہ کا مطالعہ کرتے ہوئے"
                    caption="تصویر ۲ — فقہی تصنیف و تالیف کی روایتی علمی فضا، جہاں قرآن و حدیث کی روشنی میں روزمرہ کے مسائل تحریر کیے جاتے تھے۔"
                    aspectClass="aspect-[16/9]"
                  />
                </div>
              )}
            </div>

            {/* Issue Switcher Strip (in Single Masala Mode) */}
            {readingMode === 'single' && (
              <div className="border-b border-stone-300 py-6">
                <div className="mb-3.5 text-base font-bold text-stone-700 sm:text-lg">
                  اس باب کے اہم مسائل (منتخب کریں):
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activeChapter.masail.map((masala) => {
                    const selected = masala.id === activeMasala.id;
                    return (
                      <button
                        key={masala.id}
                        type="button"
                        onClick={() => onSelectMasala(masala.id)}
                        className={`flex items-start gap-3 rounded-md border px-4 py-3.5 text-right transition-colors ${
                          selected
                            ? 'border-[#14532D] bg-[#14532D]/10 text-[#14532D]'
                            : 'border-stone-300 bg-white text-stone-800 hover:border-stone-400 hover:bg-[#F5F1E8]'
                        }`}
                      >
                        <span className="tabular-nums mt-0.5 text-base font-bold sm:text-lg">
                          {masala.numberUrdu}.
                        </span>
                        <span className="text-base font-bold leading-relaxed sm:text-xl">
                          {masala.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Masail Articles */}
            <div className="divide-y divide-stone-300">
              {masailToDisplay.map((masala) => {
                const isSaved = savedMasalaIds.includes(masala.id);
                const isCopied = copiedId === masala.id;

                return (
                  <article key={masala.id} className="py-10 first:pt-8">
                    {/* Metadata + Utility Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5 text-base font-bold text-stone-600 sm:text-lg">
                        <span className="tabular-nums text-[#78350F]">
                          مسئلہ {masala.numberUrdu}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>شرعی حکم: {masala.ruling}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => onToggleSaveMasala(masala.id)}
                          className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-base font-bold transition-colors ${
                            isSaved
                              ? 'border-[#14532D] bg-[#14532D] text-[#FBF9F5]'
                              : 'border-stone-400 bg-white text-stone-800 hover:border-stone-500'
                          }`}
                        >
                          <Bookmark className="h-4 w-4" aria-hidden="true" />
                          <span>{isSaved ? 'محفوظ شدہ' : 'محفوظ کریں'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyMasala(activeChapter, masala)}
                          className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-md border border-stone-400 bg-white px-4 py-2 text-base font-bold text-stone-800 transition-colors hover:border-stone-500"
                        >
                          {isCopied ? (
                            <>
                              <Check
                                className="h-4 w-4 text-[#14532D]"
                                aria-hidden="true"
                              />
                              <span className="text-[#14532D]">کاپی ہو گیا</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" aria-hidden="true" />
                              <span>خلاصہ کاپی کریں</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Masala Heading */}
                    <h4 className="font-nastaliq mt-5 text-3xl font-bold text-[#0F0D0B] sm:text-[2.6rem]">
                      {masala.title}
                    </h4>

                    {/* Core Question Box */}
                    <div className="mt-6 rounded-md border border-stone-300 bg-[#F3EFE6] p-6 sm:p-7">
                      <div className="text-lg font-bold text-[#78350F] sm:text-xl">
                        بنیادی سوال (استفتاء)
                      </div>
                      <p className="mt-2.5 text-2xl font-bold leading-[1.95] text-[#0F0D0B] sm:text-[32px]">
                        {masala.question}
                      </p>
                    </div>

                    {/* Easy Urdu Explanation Prose (Scaled +45%!) */}
                    <div className="mt-8">
                      <h5 className="mb-4 text-xl font-bold text-[#14532D] sm:text-2xl">
                        آسان اردو زبان میں تفصیلی وضاحت
                      </h5>
                      <div
                        className={`space-y-7 text-[#0F0D0B] ${FONT_SIZE_CLASSES[fontScale]}`}
                      >
                        {masala.easyExplanation.map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {/* Principles & Practical Takeaway Grid */}
                    <div className="mt-9 space-y-6 border-t border-stone-300 pt-7">
                      <div>
                        <h5 className="text-lg font-bold text-stone-700 sm:text-xl">
                          شرعی اصول اور دلائل
                        </h5>
                        <p className="mt-2.5 text-xl font-bold leading-[1.95] text-[#1C1917] sm:text-[27px]">
                          {masala.principlesAndProofs}
                        </p>
                      </div>

                      <div className="rounded-md border border-stone-300 bg-[#F8F5EE] p-6 sm:p-7">
                        <h5 className="text-lg font-bold text-[#14532D] sm:text-xl">
                          عملی زندگی کے لیے اہم رہنمائی
                        </h5>
                        <p className="mt-2.5 text-xl font-bold leading-[1.95] text-[#0F0D0B] sm:text-[28px]">
                          {masala.practicalTakeaway}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-base font-bold text-stone-700 sm:text-lg">
                        <span>ماخذ و حوالہ: {masala.reference}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom Navigation Pagination */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-300 pt-7">
              {readingMode === 'single' ? (
                <>
                  <button
                    type="button"
                    onClick={handlePrevMasala}
                    disabled={
                      activeChapterIndex === 0 && activeMasalaIndex === 0
                    }
                    className="inline-flex min-h-[50px] items-center gap-2 whitespace-nowrap rounded-md border border-stone-400 bg-white px-6 py-3 text-lg font-bold text-[#0F0D0B] transition-colors hover:bg-[#F3EFE6] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    <span>پچھلا مسئلہ</span>
                  </button>

                  <span className="tabular-nums text-base font-bold text-stone-700 sm:text-lg">
                    مسئلہ {activeMasalaIndex + 1} از {activeChapter.masail.length}{' '}
                    · باب {activeChapter.numberUrdu}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextMasala}
                    disabled={
                      activeChapterIndex === chapters.length - 1 &&
                      activeMasalaIndex === activeChapter.masail.length - 1
                    }
                    className="inline-flex min-h-[50px] items-center gap-2 whitespace-nowrap rounded-md bg-[#14532D] px-6 py-3 text-lg font-bold text-[#FBF9F5] transition-colors hover:bg-[#114224] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span>اگلا مسئلہ</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      if (activeChapterIndex > 0) {
                        onSelectChapter(chapters[activeChapterIndex - 1].id);
                      }
                    }}
                    disabled={activeChapterIndex === 0}
                    className="inline-flex min-h-[50px] items-center gap-2 whitespace-nowrap rounded-md border border-stone-400 bg-white px-6 py-3 text-lg font-bold text-[#0F0D0B] transition-colors hover:bg-[#F3EFE6] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    <span>پچھلا باب</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (activeChapterIndex < chapters.length - 1) {
                        onSelectChapter(chapters[activeChapterIndex + 1].id);
                      }
                    }}
                    disabled={activeChapterIndex === chapters.length - 1}
                    className="inline-flex min-h-[50px] items-center gap-2 whitespace-nowrap rounded-md bg-[#14532D] px-6 py-3 text-lg font-bold text-[#FBF9F5] transition-colors hover:bg-[#114224] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span>اگلا باب</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Chapter Margin Notes, Famous Treatises & Related Chapters Strip */}
            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-stone-300 pt-8 md:grid-cols-3">
              {/* Contextual Margin Notes */}
              <div className="rounded-md border border-stone-300 bg-[#F5F1E8] p-5">
                <h3 className="border-b border-stone-300 pb-2.5 text-lg font-bold text-[#0F0D0B]">
                  اس باب کی اہم اصطلاحات (حاشیہ)
                </h3>
                <dl className="mt-4 space-y-4">
                  {activeChapter.marginNotes.map((note) => (
                    <div key={note.term}>
                      <dt className="text-base font-bold text-[#14532D] sm:text-lg">
                        {note.term}
                      </dt>
                      <dd className="mt-1 text-base font-semibold leading-[1.9] text-[#1C1917]">
                        {note.meaning}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Famous Treatises in This Chapter */}
              <div className="rounded-md border border-stone-300 bg-white p-5">
                <h3 className="border-b border-stone-300 pb-2.5 text-lg font-bold text-[#0F0D0B]">
                  اس باب کے مشہور رسائلِ رضویہ
                </h3>
                <ul className="mt-4 space-y-3">
                  {activeChapter.keyTreatises.map((treatise, idx) => (
                    <li
                      key={treatise}
                      className="flex items-start gap-2.5 text-base font-semibold leading-relaxed text-[#1C1917] sm:text-lg"
                    >
                      <span className="tabular-nums font-bold text-[#78350F]">
                        {idx + 1}.
                      </span>
                      <span>{treatise}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Chapters Quick Links */}
              <div className="rounded-md border border-stone-300 bg-white p-5">
                <h3 className="border-b border-stone-300 pb-2.5 text-lg font-bold text-[#0F0D0B]">
                  متعلقہ ابواب
                </h3>
                <div className="mt-4 space-y-2.5">
                  {activeChapter.relatedChapterIds.map((relId) => {
                    const relChapter = chapters.find((c) => c.id === relId);
                    if (!relChapter) return null;
                    return (
                      <button
                        key={relChapter.id}
                        type="button"
                        onClick={() => onSelectChapter(relChapter.id)}
                        className="flex w-full items-center justify-between gap-2 rounded border border-stone-300 bg-[#FBF9F5] px-4 py-3 text-right text-base font-bold text-[#1C1917] transition-colors hover:border-[#14532D]/50 hover:text-[#14532D]"
                      >
                        <span className="truncate">
                          {relChapter.numberUrdu}. {relChapter.urduTitle}
                        </span>
                        <ChevronLeft
                          className="h-5 w-5 shrink-0"
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
