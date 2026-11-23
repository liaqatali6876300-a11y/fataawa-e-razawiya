import React, { useMemo } from 'react';
import { CheckCircle2, ChevronLeft, Search, X } from 'lucide-react';
import { Bab, Jild, JildCategory } from '../types/fatawa';
import { JILD_CATEGORIES } from '../data/fatawaCatalog';

interface HomeJildListProps {
  jilds: Jild[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: JildCategory | 'all';
  onSelectCategory: (cat: JildCategory | 'all') => void;
  studiedBabIds: string[];
  onSelectJild: (jildId: string) => void;
  onSelectBab: (jildId: string, babId: string) => void;
}

export const HomeJildList: React.FC<HomeJildListProps> = ({
  jilds,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  studiedBabIds,
  onSelectJild,
  onSelectBab,
}) => {
  const totalAbwab = useMemo(
    () => jilds.reduce((sum, j) => sum + j.abwab.length, 0),
    [jilds]
  );

  const studiedSet = useMemo(() => new Set(studiedBabIds), [studiedBabIds]);
  const studiedCount = studiedSet.size;
  const remainingCount = Math.max(0, totalAbwab - studiedCount);
  const progressPercent =
    totalAbwab > 0 ? Math.round((studiedCount / totalAbwab) * 100) : 0;

  const trimmedQuery = searchQuery.trim();

  const filteredJilds = useMemo(() => {
    return jilds.filter((jild) => {
      const categoryMatch =
        selectedCategory === 'all' || jild.category === selectedCategory;
      if (!categoryMatch) return false;

      if (!trimmedQuery) return true;

      const q = trimmedQuery.toLowerCase();
      const jildHit =
        `جلد نمبر ${jild.jildNumber}`.includes(q) ||
        jild.jildNumber.toString() === q ||
        jild.title.toLowerCase().includes(q) ||
        jild.shortIntro.toLowerCase().includes(q) ||
        jild.category.toLowerCase().includes(q);

      if (jildHit) return true;

      return jild.abwab.some(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.shortSummary.toLowerCase().includes(q) ||
          b.maslaDetail.toLowerCase().includes(q) ||
          b.daleelDetail.toLowerCase().includes(q)
      );
    });
  }, [jilds, selectedCategory, trimmedQuery]);

  const matchingAbwab = useMemo(() => {
    if (!trimmedQuery) return [];
    const q = trimmedQuery.toLowerCase();
    const hits: { jild: Jild; bab: Bab }[] = [];

    for (const jild of jilds) {
      if (selectedCategory !== 'all' && jild.category !== selectedCategory) {
        continue;
      }
      for (const bab of jild.abwab) {
        const hit =
          bab.title.toLowerCase().includes(q) ||
          bab.shortSummary.toLowerCase().includes(q) ||
          bab.maslaDetail.toLowerCase().includes(q) ||
          bab.daleelDetail.toLowerCase().includes(q) ||
          bab.easyExplanation.some((line) => line.toLowerCase().includes(q));
        if (hit) {
          hits.push({ jild, bab });
        }
      }
    }
    return hits;
  }, [jilds, selectedCategory, trimmedQuery]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Main Hero Banner Box matching screenshot */}
      <section className="rounded-2xl border border-[#1E2E54] bg-[#0F1834] px-5 py-8 text-center shadow-2xl shadow-black/30 sm:px-8 sm:py-10">
        <h1 className="text-2xl leading-[1.9] text-white sm:text-3xl md:text-4xl">
          فتاویٰ رضویہ - 30 جلدوں پر مشتمل مکمل فقہی شاہکار
        </h1>
        <p className="mx-auto mt-3 max-w-4xl text-lg leading-[2.1] text-[#CBD5E1] sm:text-xl">
          امام احمد رضا خان رحمۃ اللہ علیہ کی ۳۰ جلدیں • ہر جلد کے مستند ابواب، صفحہ نمبر، دلیل اور آسان اردو میں مکمل وضاحت
        </p>
      </section>

      {/* Progress Bar + Count Strip matching screenshot */}
      <section className="mt-6">
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-[#162244] border border-[#1E2E54]"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="مطالعہ کی پیش رفت"
        >
          <div
            className="h-full rounded-full bg-[#10B981] transition-all duration-300"
            style={{
              width: studiedCount === 0 ? '18px' : `${progressPercent}%`,
            }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-base text-[#CBD5E1] sm:text-lg tabular-nums">
          <p className="text-white">
            کل 30 جلدیں • کل ابواب: {totalAbwab}
          </p>
          <p className="text-[#CBD5E1]">
            مطالعہ شدہ: {studiedCount} • باقی: {remainingCount}
          </p>
        </div>
      </section>

      {/* Search Bar & Category Filter Tabs Row matching screenshot */}
      <section className="mt-6 flex flex-col gap-4">
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جلد، باب یا کوئی بھی فقہی مسئلہ تلاش کریں..."
            aria-label="جلد، باب یا مسئلہ تلاش کریں"
            className="w-full rounded-xl border border-[#1E2E54] bg-[#101A36] py-3.5 pr-12 pl-12 text-lg text-white placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none sm:text-xl"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="تلاش صاف کریں"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#1E2E54] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`rounded-xl border px-4 py-2 text-base transition-colors sm:text-lg ${
              selectedCategory === 'all'
                ? 'border-[#10B981] bg-[#059669] text-white'
                : 'border-[#1E2E54] bg-[#101A36] text-[#E2E8F0] hover:border-[#38BDF8]/60 hover:text-white'
            }`}
          >
            تمام جلدیں ({jilds.length})
          </button>

          {JILD_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`rounded-xl border px-4 py-2 text-base transition-colors sm:text-lg ${
                selectedCategory === category
                  ? 'border-[#10B981] bg-[#059669] text-white'
                  : 'border-[#1E2E54] bg-[#101A36] text-[#E2E8F0] hover:border-[#38BDF8]/60 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Direct Matching Abwab Results when searching */}
      {trimmedQuery && matchingAbwab.length > 0 && (
        <section className="mt-7 rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2E54] pb-3">
            <h2 className="text-xl text-[#38BDF8] sm:text-2xl">
              تلاش سے ملنے والے براہِ راست ابواب و مسائل
            </h2>
            <span className="tabular-nums text-base text-[#CBD5E1] sm:text-lg">
              کل نتائج: {matchingAbwab.length}
            </span>
          </div>

          <div className="divide-y divide-[#1E2E54]">
            {matchingAbwab.slice(0, 12).map(({ jild, bab }) => (
              <button
                key={bab.id}
                type="button"
                onClick={() => onSelectBab(jild.id, bab.id)}
                className="flex w-full flex-col gap-2 py-4 text-right transition-colors hover:bg-[#142248]/60 sm:px-3 rounded-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-lg text-white sm:text-xl leading-[1.9]">
                    جلد {jild.jildNumber} • باب {bab.babNumber}: {bab.title}
                  </span>
                  <span className="tabular-nums rounded-lg border border-[#243766] bg-[#162348] px-3 py-1 text-base text-[#38BDF8]">
                    صفحہ {bab.pageNumber}
                  </span>
                </div>
                <p className="text-base text-[#CBD5E1] sm:text-lg leading-[2]">
                  {bab.shortSummary}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 30 Jild Cards List - One by One */}
      <section className="mt-7" aria-label="فتاویٰ رضویہ کی تمام جلدیں">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl text-[#38BDF8] sm:text-2xl">
            {selectedCategory === 'all'
              ? 'مکمل فہرستِ جلد ہائے فتاویٰ رضویہ'
              : `موضوع: ${selectedCategory}`}
          </h2>
          <span className="tabular-nums text-base text-[#CBD5E1] sm:text-lg">
            نمایاں جلدیں: {filteredJilds.length}
          </span>
        </div>

        {filteredJilds.length === 0 ? (
          <div className="rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-8 text-center">
            <p className="text-xl text-white">
              آپ کی تلاش کے مطابق کوئی جلد یا باب نہیں ملا۔
            </p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
              }}
              className="mt-4 rounded-xl bg-[#059669] px-5 py-2.5 text-lg text-white hover:bg-[#10B981]"
            >
              تمام 30 جلدیں دکھائیں
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredJilds.map((jild) => {
              const jildStudied = jild.abwab.filter((b) =>
                studiedSet.has(b.id)
              ).length;
              const isJildDone =
                jild.abwab.length > 0 && jildStudied === jild.abwab.length;

              return (
                <button
                  key={jild.id}
                  type="button"
                  onClick={() => onSelectJild(jild.id)}
                  className="group flex w-full flex-col gap-3 rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-5 text-right shadow-lg shadow-black/20 transition-all hover:border-[#38BDF8]/70 hover:bg-[#142044] sm:p-6"
                >
                  <div className="flex w-full flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="tabular-nums rounded-xl border border-[#38BDF8]/40 bg-[#13264D] px-4 py-1.5 text-lg text-[#38BDF8] sm:text-xl">
                        جلد نمبر {jild.jildNumber}
                      </span>
                      <h3 className="text-xl text-white sm:text-2xl leading-[1.9]">
                        {jild.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {isJildDone && (
                        <span className="flex items-center gap-1.5 rounded-xl bg-[#059669]/25 border border-[#10B981]/50 px-3 py-1 text-base text-[#10B981]">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          <span>مکمل</span>
                        </span>
                      )}
                      <span className="tabular-nums rounded-xl border border-[#243766] bg-[#162348] px-4 py-1.5 text-base text-white sm:text-lg">
                        اس جلد میں کل ابواب: {jild.abwab.length}
                      </span>
                      <ChevronLeft
                        className="h-6 w-6 text-[#94A3B8] transition-transform group-hover:-translate-x-1 group-hover:text-[#38BDF8]"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <p className="text-lg leading-[2.15] text-[#CBD5E1] sm:text-xl">
                    <span className="text-white">مختصر تعارف: </span>
                    {jild.shortIntro}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};
