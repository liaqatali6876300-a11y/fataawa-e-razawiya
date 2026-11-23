import React from 'react';
import {
  ArrowRight,
  Bookmark,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Bab, Jild } from '../types/fatawa';

interface BabDetailPageProps {
  jild: Jild;
  bab: Bab;
  isBookmarked: boolean;
  isStudied: boolean;
  hasPrevBab: boolean;
  hasNextBab: boolean;
  onBackToJild: () => void;
  onToggleBookmark: () => void;
  onToggleStudied: () => void;
  onGoPrevBab: () => void;
  onGoNextBab: () => void;
}

export const BabDetailPage: React.FC<BabDetailPageProps> = ({
  jild,
  bab,
  isBookmarked,
  isStudied,
  hasPrevBab,
  hasNextBab,
  onBackToJild,
  onToggleBookmark,
  onToggleStudied,
  onGoPrevBab,
  onGoNextBab,
}) => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Top Action Bar with Back Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToJild}
          className="flex items-center gap-2 rounded-xl border border-[#1E2E54] bg-[#101A36] px-5 py-2.5 text-lg text-white transition-colors hover:border-[#38BDF8] hover:bg-[#16244A]"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-base transition-colors sm:text-lg ${
              isBookmarked
                ? 'border-[#10B981] bg-[#059669]/25 text-[#10B981]'
                : 'border-[#1E2E54] bg-[#101A36] text-white hover:border-[#38BDF8]'
            }`}
          >
            <Bookmark className="h-5 w-5" aria-hidden="true" />
            <span>{isBookmarked ? 'محفوظ شدہ' : 'محفوظ کریں'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleStudied}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-base text-white transition-colors sm:text-lg ${
              isStudied
                ? 'bg-[#059669] hover:bg-[#10B981]'
                : 'border border-[#1E2E54] bg-[#101A36] hover:border-[#10B981]'
            }`}
          >
            <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
            <span>{isStudied ? 'مطالعہ مکمل ہوا' : 'مطالعہ مکمل کریں'}</span>
          </button>
        </div>
      </div>

      {/* Bab Header Card */}
      <section className="rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="tabular-nums rounded-xl border border-[#38BDF8]/40 bg-[#13264D] px-4 py-1 text-lg text-[#38BDF8]">
            جلد نمبر {jild.jildNumber}
          </span>
          <span className="tabular-nums rounded-xl border border-[#243766] bg-[#162348] px-4 py-1 text-lg text-white">
            باب {bab.babNumber}
          </span>
          <span className="tabular-nums rounded-xl border border-[#243766] bg-[#162348] px-4 py-1 text-lg text-[#38BDF8]">
            صفحہ نمبر {bab.pageNumber}
          </span>
        </div>

        <h1 className="mt-4 text-2xl leading-[1.95] text-white sm:text-3xl md:text-4xl">
          {bab.title}
        </h1>
        <p className="mt-3 text-lg leading-[2.15] text-[#CBD5E1] sm:text-xl">
          {bab.shortSummary}
        </p>
      </section>

      {/* Section 1: Masla Kya Hai */}
      <section className="mt-6 rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-6 shadow-lg sm:p-8">
        <h2 className="border-b border-[#1E2E54] pb-3 text-xl text-[#38BDF8] sm:text-2xl">
          مسئلہ کیا ہے؟
        </h2>
        <p className="mt-4 text-xl leading-[2.2] text-white sm:text-2xl">
          {bab.maslaDetail}
        </p>
      </section>

      {/* Section 2: Daleel Kya Hai */}
      <section className="mt-6 rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-6 shadow-lg sm:p-8">
        <h2 className="border-b border-[#1E2E54] pb-3 text-xl text-[#10B981] sm:text-2xl">
          دلیل کیا ہے؟
        </h2>
        <p className="mt-4 text-xl leading-[2.2] text-white sm:text-2xl">
          {bab.daleelDetail}
        </p>
      </section>

      {/* Section 3: Aasan Urdu Mein Zaroori Wazahat */}
      <section className="mt-6 rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-6 shadow-lg sm:p-8">
        <h2 className="border-b border-[#1E2E54] pb-3 text-xl text-[#38BDF8] sm:text-2xl">
          آسان اردو میں ضروری وضاحت
        </h2>
        <div className="mt-4 space-y-5">
          {bab.easyExplanation.map((paragraph, index) => (
            <p
              key={index}
              className="text-xl leading-[2.25] text-white sm:text-2xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-[#243766] bg-[#162348] px-5 py-3.5">
          <p className="text-base text-[#CBD5E1] sm:text-lg">
            <span className="text-[#38BDF8]">اصل حوالہ: </span>
            {bab.referenceNote}
          </p>
        </div>
      </section>

      {/* Bottom Prev/Next Bab & Back Navigation */}
      <nav
        aria-label="باب کی تبدیلی"
        className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E2E54] pt-6"
      >
        <button
          type="button"
          disabled={!hasPrevBab}
          onClick={onGoPrevBab}
          className="flex items-center gap-2 rounded-xl border border-[#1E2E54] bg-[#101A36] px-5 py-3 text-lg text-white transition-colors hover:border-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span>پچھلا باب</span>
        </button>

        <button
          type="button"
          onClick={onBackToJild}
          className="rounded-xl border border-[#1E2E54] bg-[#101A36] px-5 py-3 text-lg text-white transition-colors hover:border-[#38BDF8]"
        >
          واپس جائیں
        </button>

        <button
          type="button"
          disabled={!hasNextBab}
          onClick={onGoNextBab}
          className="flex items-center gap-2 rounded-xl bg-[#059669] px-5 py-3 text-lg text-white transition-colors hover:bg-[#10B981] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>اگلا باب</span>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </main>
  );
};
