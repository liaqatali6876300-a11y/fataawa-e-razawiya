import { ArrowLeft } from 'lucide-react';
import { ArchivalImage } from './ArchivalImage';

interface HeroBroadsheetProps {
  totalChapters: number;
  totalMasail: number;
  studiedCount: number;
  onStartReading: () => void;
  onViewVolumes: () => void;
}

export function HeroBroadsheet({
  totalChapters,
  totalMasail,
  studiedCount,
  onStartReading,
  onViewVolumes,
}: HeroBroadsheetProps) {
  return (
    <section
      id="top"
      className="border-b border-stone-200 bg-[#FBF9F5] pt-8 pb-10 sm:pt-12 sm:pb-14"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        {/* 2-Column Editorial Split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Lead Column */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-stone-500">
                <span>العطایا النبویہ فی الفتاویٰ الرضویہ</span>
                <span aria-hidden="true">·</span>
                <span>جلد ۱ تا ۳۰</span>
                <span aria-hidden="true">·</span>
                <span>آسان اردو تشریحی ایڈیشن</span>
              </div>

              <h1
                className="font-nastaliq max-w-2xl text-3xl font-bold text-[#1C1917] sm:text-4xl lg:text-[2.65rem]"
                style={{ textWrap: 'balance', lineHeight: '2.1' }}
              >
                فتاویٰ رضویہ: آسان اردو زبان میں باب در باب مکمل شرعی رہنمائی
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-[1.95] text-stone-700 sm:text-lg">
                مجددِ دین و ملت امام احمد رضا خان رحمۃ اللہ علیہ کے ۳۰ جلدوں پر
                مشتمل فقہی شاہکار کو اب عام فہم، سلیس اردو اور وضاحت بھرے انداز میں
                پڑھیے۔ طہارت و نماز سے لے کر نکاح، تجارت، عقائد اور وراثت تک ہر
                باب کے بنیادی مسائل، ان کی عملی مثالیں اور مستند حوالے ایک منظم
                مطالعاتی شکل میں یکجا کیے گئے ہیں۔
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-stone-200/80 pt-6">
              <button
                type="button"
                onClick={onStartReading}
                className="inline-flex min-h-[44px] items-center gap-2.5 whitespace-nowrap rounded-md bg-[#14532D] px-6 py-2.5 text-sm font-semibold text-[#FBF9F5] transition-colors hover:bg-[#114224] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
              >
                <span>ابواب کا مطالعہ شروع کریں</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onViewVolumes}
                className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-md border border-stone-300 bg-[#F3EFE6] px-5 py-2.5 text-sm font-medium text-[#1C1917] transition-colors hover:border-stone-400 hover:bg-[#EBE5D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
              >
                ۳۰ جلدوں کا نقشہ دیکھیں
              </button>

              {studiedCount > 0 && (
                <span className="text-xs text-stone-500">
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
              aspectClass="aspect-[4/3] lg:h-full lg:min-h-[340px]"
              className="h-full"
            />
          </div>
        </div>

        {/* Full-Width 4-Column Archival Summary Strip */}
        <dl className="mt-10 grid grid-cols-2 border-y border-stone-200 bg-[#F5F1E8] sm:grid-cols-4">
          <div className="border-b border-l border-stone-200 px-5 py-4 sm:border-b-0">
            <dt className="text-xs text-stone-500">مکمل ایڈیشن کا دائرہ</dt>
            <dd className="tabular-nums mt-1 text-xl font-bold text-[#1C1917]">
              ۳۰ ضخیم جلدیں
            </dd>
          </div>
          <div className="border-b border-stone-200 px-5 py-4 sm:border-b-0 sm:border-l">
            <dt className="text-xs text-stone-500">منظم فقہی ابواب</dt>
            <dd className="tabular-nums mt-1 text-xl font-bold text-[#1C1917]">
              {totalChapters} بنیادی ابواب
            </dd>
          </div>
          <div className="border-l border-stone-200 px-5 py-4">
            <dt className="text-xs text-stone-500">تفصیلی تشریحی مباحث</dt>
            <dd className="tabular-nums mt-1 text-xl font-bold text-[#1C1917]">
              {totalMasail} توضیحی مسائل
            </dd>
          </div>
          <div className="px-5 py-4">
            <dt className="text-xs text-stone-500">علمی رسائل و تصانیف</dt>
            <dd className="tabular-nums mt-1 text-xl font-bold text-[#14532D]">
              ۲۰۶+ تحقیقی رسائل
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
