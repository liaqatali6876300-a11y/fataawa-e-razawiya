import { FormEvent, RefObject, useMemo } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Chapter, Masala } from '../types/fatawa';
import { ArchivalImage } from './ArchivalImage';

interface HeroBroadsheetProps {
  chapters: Chapter[];
  totalChapters: number;
  totalMasail: number;
  studiedCount: number;
  searchQuery: string;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onSearchChange: (value: string) => void;
  onSelectSearchResult: (chapterId: string, masalaId: string) => void;
  onStartReading: () => void;
  onViewVolumes: () => void;
}

const QUICK_TOPICS = ['وضو', 'نماز', 'زکوٰۃ', 'طلاق', 'وراثت', 'کرنسی'];

export function HeroBroadsheet({
  chapters,
  totalChapters,
  totalMasail,
  studiedCount,
  searchQuery,
  searchInputRef,
  onSearchChange,
  onSelectSearchResult,
  onStartReading,
  onViewVolumes,
}: HeroBroadsheetProps) {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const first = searchResults[0];
      onSelectSearchResult(first.chapter.id, first.masala.id);
    } else {
      searchInputRef.current?.focus();
    }
  };

  return (
    <section
      id="top"
      className="border-b border-stone-200 bg-[#FBF9F5] pt-8 pb-10 sm:pt-12 sm:pb-14"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* 2-Column Editorial Split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Lead Column */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2 text-base font-bold tracking-wide text-stone-700 sm:text-lg">
                <span>العطایا النبویہ فی الفتاویٰ الرضویہ</span>
                <span aria-hidden="true">·</span>
                <span>جلد ۱ تا ۳۰</span>
                <span aria-hidden="true">·</span>
                <span>آسان اردو تشریحی ایڈیشن</span>
              </div>

              <h1
                className="font-nastaliq max-w-3xl text-4xl font-bold text-[#0F0D0B] sm:text-5xl lg:text-[3.9rem]"
                style={{ textWrap: 'balance', lineHeight: '2.1' }}
              >
                فتاویٰ رضویہ: آسان اردو زبان میں باب در باب مکمل شرعی رہنمائی
              </h1>

              <p className="mt-5 max-w-3xl text-xl font-bold leading-[2.0] text-[#1C1917] sm:text-[28px]">
                مجددِ دین و ملت امام احمد رضا خان رحمۃ اللہ علیہ کے ۳۰ جلدوں پر
                مشتمل فقہی شاہکار کو اب عام فہم، سلیس اردو اور وضاحت بھرے انداز
                میں پڑھیے۔ طہارت و نماز سے لے کر نکاح، تجارت، عقائد اور وراثت تک
                ہر باب کے بنیادی مسائل ایک منظم مطالعاتی شکل میں یکجا کیے گئے ہیں۔
              </p>

              {/* Main Page Prominent Search Bar with Search Icon */}
              <div id="main-search" className="mt-7 max-w-3xl">
                <form
                  onSubmit={handleSubmit}
                  role="search"
                  aria-label="فتاویٰ رضویہ میں مسئلہ تلاش کریں"
                  className="flex items-stretch overflow-hidden rounded-md border-2 border-stone-400 bg-white transition-colors focus-within:border-[#14532D]"
                >
                  <button
                    type="submit"
                    aria-label="مسئلہ تلاش کریں"
                    className="flex min-h-[64px] shrink-0 items-center justify-center gap-2.5 bg-[#14532D] px-6 text-lg font-bold text-[#FBF9F5] transition-colors hover:bg-[#114224] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] sm:text-xl"
                  >
                    <Search className="h-6 w-6" aria-hidden="true" />
                    <span className="hidden whitespace-nowrap sm:inline">
                      تلاش کریں
                    </span>
                  </button>

                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="کوئی بھی مسئلہ تلاش کریں (مثلاً: وضو، نماز، زکوٰۃ، طلاق، وراثت)..."
                    aria-label="مسئلہ تلاش کرنے کے لیے لفظ لکھیں"
                    className="min-h-[64px] w-full bg-transparent px-4 text-lg font-bold text-[#0F0D0B] placeholder:font-semibold placeholder:text-stone-400 focus:outline-none sm:text-2xl"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      aria-label="تلاش صاف کریں"
                      className="flex min-h-[64px] w-14 shrink-0 items-center justify-center text-stone-600 hover:bg-stone-100 hover:text-[#0F0D0B]"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  )}
                </form>

                {/* Quick Search Suggestions (unboxed text links with · separators) */}
                <div className="mt-3.5 flex flex-wrap items-center gap-3 text-base font-bold text-stone-700 sm:text-lg">
                  <span>فوری تلاش:</span>
                  {QUICK_TOPICS.map((topic, index) => (
                    <span key={topic} className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSearchChange(topic)}
                        className="font-bold text-[#14532D] hover:underline hover:underline-offset-4"
                      >
                        {topic}
                      </button>
                      {index < QUICK_TOPICS.length - 1 && (
                        <span aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Instant Live Search Results on Main Page */}
                {normalizedQuery && (
                  <div className="mt-4 rounded-md border border-stone-300 bg-[#F4F0E7] p-5">
                    <div className="mb-3 flex items-center justify-between gap-4 border-b border-stone-300 pb-2.5">
                      <span className="text-base font-bold text-[#0F0D0B] sm:text-lg">
                        "{searchQuery}" کے نتائج ({searchResults.length} مسائل ملے)
                      </span>
                      <button
                        type="button"
                        onClick={() => onSearchChange('')}
                        className="text-base font-bold text-[#14532D] hover:underline"
                      >
                        بند کریں
                      </button>
                    </div>

                    {searchResults.length === 0 ? (
                      <p className="py-2 text-base font-semibold leading-relaxed text-stone-700 sm:text-lg">
                        کوئی براہِ راست نتیجہ نہیں ملا۔ کوئی آسان لفظ (مثلاً نماز، روزہ، زکوٰۃ، نکاح، سود، یا وراثت) لکھ کر کوشش کریں۔
                      </p>
                    ) : (
                      <ul className="max-h-80 space-y-2.5 overflow-y-auto">
                        {searchResults.slice(0, 8).map(({ chapter, masala }) => (
                          <li key={masala.id}>
                            <button
                              type="button"
                              onClick={() =>
                                onSelectSearchResult(chapter.id, masala.id)
                              }
                              className="flex w-full items-center justify-between gap-3 rounded border border-stone-300 bg-[#FBF9F5] px-4 py-3.5 text-right transition-colors hover:border-[#14532D]/60 hover:bg-white"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-bold text-stone-600 sm:text-base">
                                  باب {chapter.numberUrdu}: {chapter.arabicTitle}{' '}
                                  · {masala.ruling}
                                </div>
                                <div className="mt-1 truncate text-lg font-bold text-[#0F0D0B] sm:text-xl">
                                  {masala.title}
                                </div>
                              </div>
                              <ArrowLeft
                                className="h-6 w-6 shrink-0 text-[#14532D]"
                                aria-hidden="true"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-stone-200/80 pt-6">
              <button
                type="button"
                onClick={onStartReading}
                className="inline-flex min-h-[54px] items-center gap-3 whitespace-nowrap rounded-md bg-[#14532D] px-7 py-3 text-lg font-bold text-[#FBF9F5] transition-colors hover:bg-[#114224] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] sm:text-xl"
              >
                <span>ابواب کا مطالعہ شروع کریں</span>
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onViewVolumes}
                className="inline-flex min-h-[54px] items-center whitespace-nowrap rounded-md border border-stone-400 bg-[#F3EFE6] px-6 py-3 text-lg font-bold text-[#0F0D0B] transition-colors hover:border-stone-500 hover:bg-[#EBE5D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] sm:text-xl"
              >
                ۳۰ جلدوں کا نقشہ دیکھیں
              </button>

              {studiedCount > 0 && (
                <span className="text-base font-bold text-stone-700">
                  آپ کی مطالعاتی پیش رفت: {studiedCount} از {totalChapters} ابواب مکمل
                </span>
              )}
            </div>
          </div>

          {/* Focal Archival Visual Column */}
          <div className="lg:col-span-5">
            <ArchivalImage
              src="/src/assets/images/hero_islamic_manuscript_1795460881722.jpg"
              alt="قدیم فقہی مخطوطات اور جلد بند کتب رحل پر رکھی ہوئی ہیں"
              caption="تصویر ۱ — کلاسیکی فقہِ حنفی کے مخطوطات و مطبوعہ مجلدات کا مطالعاتی نمونہ، جن کی بنیاد پر یہ آسان اردو خلاصہ مرتب کیا گیا ہے۔"
              aspectClass="aspect-[4/3] lg:h-full lg:min-h-[360px]"
              className="h-full"
            />
          </div>
        </div>

        {/* Full-Width 4-Column Archival Summary Strip */}
        <dl className="mt-10 grid grid-cols-2 border-y border-stone-300 bg-[#F5F1E8] sm:grid-cols-4">
          <div className="border-b border-l border-stone-300 px-5 py-5 sm:border-b-0">
            <dt className="text-base font-bold text-stone-700">مکمل ایڈیشن کا دائرہ</dt>
            <dd className="tabular-nums mt-1.5 text-2xl font-bold text-[#0F0D0B] sm:text-3xl">
              ۳۰ ضخیم جلدیں
            </dd>
          </div>
          <div className="border-b border-stone-300 px-5 py-5 sm:border-b-0 sm:border-l">
            <dt className="text-base font-bold text-stone-700">منظم فقہی ابواب</dt>
            <dd className="tabular-nums mt-1.5 text-2xl font-bold text-[#0F0D0B] sm:text-3xl">
              {totalChapters} بنیادی ابواب
            </dd>
          </div>
          <div className="border-l border-stone-300 px-5 py-5">
            <dt className="text-base font-bold text-stone-700">تفصیلی تشریحی مباحث</dt>
            <dd className="tabular-nums mt-1.5 text-2xl font-bold text-[#0F0D0B] sm:text-3xl">
              {totalMasail} توضیحی مسائل
            </dd>
          </div>
          <div className="px-5 py-5">
            <dt className="text-base font-bold text-stone-700">علمی رسائل و تصانیف</dt>
            <dd className="tabular-nums mt-1.5 text-2xl font-bold text-[#14532D] sm:text-3xl">
              ۲۰۶+ تحقیقی رسائل
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
