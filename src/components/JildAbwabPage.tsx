import React, { useMemo } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Jild } from '../types/fatawa';

interface JildAbwabPageProps {
  jild: Jild;
  studiedBabIds: string[];
  hasPrevJild: boolean;
  hasNextJild: boolean;
  onBackHome: () => void;
  onSelectBab: (babId: string) => void;
  onGoPrevJild: () => void;
  onGoNextJild: () => void;
}

export const JildAbwabPage: React.FC<JildAbwabPageProps> = ({
  jild,
  studiedBabIds,
  hasPrevJild,
  hasNextJild,
  onBackHome,
  onSelectBab,
  onGoPrevJild,
  onGoNextJild,
}) => {
  const studiedSet = useMemo(() => new Set(studiedBabIds), [studiedBabIds]);
  const jildStudiedCount = jild.abwab.filter((b) => studiedSet.has(b.id)).length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Top Back Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-2 rounded-xl border border-[#1E2E54] bg-[#101A36] px-5 py-2.5 text-lg text-white transition-colors hover:border-[#38BDF8] hover:bg-[#16244A]"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>

        <span className="tabular-nums rounded-xl border border-[#1E2E54] bg-[#101A36] px-4 py-2 text-base text-[#CBD5E1] sm:text-lg">
          مطالعہ شدہ ابواب: {jildStudiedCount} / {jild.abwab.length}
        </span>
      </div>

      {/* Jild Header Card */}
      <section className="rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="tabular-nums rounded-xl border border-[#38BDF8]/40 bg-[#13264D] px-4 py-1.5 text-lg text-[#38BDF8] sm:text-xl">
              جلد نمبر {jild.jildNumber}
            </span>
            <span className="rounded-xl border border-[#243766] bg-[#162348] px-4 py-1.5 text-base text-[#CBD5E1] sm:text-lg">
              {jild.category}
            </span>
          </div>

          <span className="tabular-nums rounded-xl bg-[#059669] px-4 py-1.5 text-base text-white sm:text-lg">
            کل ابواب: {jild.abwab.length}
          </span>
        </div>

        <h1 className="mt-4 text-2xl leading-[1.9] text-white sm:text-3xl md:text-4xl">
          {jild.title}
        </h1>
        <p className="mt-3 text-lg leading-[2.15] text-[#CBD5E1] sm:text-xl">
          {jild.shortIntro}
        </p>
      </section>

      {/* Abwab List inside this Jild */}
      <section className="mt-7" aria-label="اس جلد کے ابواب">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl text-[#38BDF8] sm:text-2xl">
            اس جلد کے تمام ابواب (مکمل تفصیل پڑھنے کے لیے باب پر کلک کریں)
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {jild.abwab.map((bab) => {
            const isStudied = studiedSet.has(bab.id);

            return (
              <button
                key={bab.id}
                type="button"
                onClick={() => onSelectBab(bab.id)}
                className="group flex w-full flex-col gap-3 rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-5 text-right shadow-lg shadow-black/20 transition-all hover:border-[#38BDF8]/70 hover:bg-[#142044] sm:p-6"
              >
                <div className="flex w-full flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="tabular-nums rounded-xl border border-[#38BDF8]/40 bg-[#13264D] px-3.5 py-1 text-lg text-[#38BDF8] sm:text-xl">
                      باب {bab.babNumber}
                    </span>
                    <h3 className="text-xl text-white sm:text-2xl leading-[1.9]">
                      {bab.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {isStudied && (
                      <span className="flex items-center gap-1.5 rounded-xl border border-[#10B981]/50 bg-[#059669]/25 px-3 py-1 text-base text-[#10B981]">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        <span>پڑھا گیا</span>
                      </span>
                    )}
                    <span className="tabular-nums rounded-xl border border-[#243766] bg-[#162348] px-4 py-1.5 text-base text-[#38BDF8] sm:text-lg">
                      صفحہ نمبر {bab.pageNumber}
                    </span>
                    <ChevronLeft
                      className="h-6 w-6 text-[#94A3B8] transition-transform group-hover:-translate-x-1 group-hover:text-[#38BDF8]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <p className="text-lg leading-[2.15] text-[#CBD5E1] sm:text-xl">
                  {bab.shortSummary}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Previous / Next Jild Footer Navigation */}
      <nav
        aria-label="جلد کی تبدیلی"
        className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E2E54] pt-6"
      >
        <button
          type="button"
          disabled={!hasPrevJild}
          onClick={onGoPrevJild}
          className="flex items-center gap-2 rounded-xl border border-[#1E2E54] bg-[#101A36] px-5 py-3 text-lg text-white transition-colors hover:border-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span>پچھلی جلد</span>
        </button>

        <button
          type="button"
          disabled={!hasNextJild}
          onClick={onGoNextJild}
          className="flex items-center gap-2 rounded-xl bg-[#059669] px-5 py-3 text-lg text-white transition-colors hover:bg-[#10B981] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>اگلی جلد</span>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </main>
  );
};
