import { ArrowLeft } from 'lucide-react';
import { VolumeCluster } from '../types/fatawa';
import { ArchivalImage } from './ArchivalImage';

interface VolumesMapSectionProps {
  clusters: VolumeCluster[];
  onOpenChapter: (chapterId: string) => void;
}

export function VolumesMapSection({
  clusters,
  onOpenChapter,
}: VolumesMapSectionProps) {
  return (
    <section
      id="volumes-map"
      className="border-b border-stone-200 bg-[#F4F0E7] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header + Archival Shelf Visual */}
        <div className="grid grid-cols-1 items-stretch gap-8 border-b border-stone-300/70 pb-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-base font-bold text-stone-600 sm:text-lg">
              جدید تخریج شدہ ایڈیشن · مکمل ۳۰ مجلدات
            </p>
            <h2 className="font-nastaliq mt-1.5 text-3xl font-bold text-[#0F0D0B] sm:text-5xl">
              فتاویٰ رضویہ کی ۳۰ جلدوں کا اجمالی نقشہ
            </h2>
            <p className="mt-4 max-w-3xl text-xl font-bold leading-[2.0] text-[#1C1917] sm:text-[26px]">
              موجودہ جدید ایڈیشن ۳۰ ضخیم جلدوں پر مشتمل ہے جسے رضا فاؤنڈیشن
              لاہور اور جامعہ نظامیہ رضویہ کے محققین نے عربی و فارسی عبارات کے
              آسان اردو ترجمے اور احادیث کی مکمل تخریج کے ساتھ شائع کیا ہے۔ ذیل
              میں آپ دیکھ سکتے ہیں کہ کس جلد میں کون سے فقہی ابواب اور مشہور
              رسائل شامل ہیں۔
            </p>
          </div>

          <div className="lg:col-span-5">
            <ArchivalImage
              src="/src/assets/images/archive_volumes_shelf_1795460883006.jpg"
              alt="فتاویٰ رضویہ کی تیس مجلدات لائبریری کے شیلف پر ترتیب سے رکھی ہوئی ہیں"
              caption="تصویر ۳ — تیس مجلدات پر مشتمل فقہی انسائیکلوپیڈیا کا لائبریری مجموعہ۔"
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>

        {/* Clean 2-Column Editorial Volume Grid (no pill clutter) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="flex flex-col justify-between rounded-md border border-stone-300 bg-[#FBF9F5] p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3 text-base font-bold">
                  <span className="tabular-nums text-[#78350F]">
                    {cluster.volumesUrdu}
                  </span>
                  <span className="text-stone-600">{cluster.arabicScope}</span>
                </div>

                <h3 className="font-nastaliq mt-4 text-2xl font-bold text-[#0F0D0B] sm:text-[1.9rem]">
                  {cluster.title}
                </h3>

                <p className="mt-3 text-lg font-bold leading-[1.95] text-[#1C1917] sm:text-2xl">
                  {cluster.description}
                </p>

                <div className="mt-5 border-t border-stone-200/70 pt-3.5">
                  <div className="text-base font-bold text-stone-600">
                    نمایاں رسائل:
                  </div>
                  <p className="mt-1 text-base font-bold leading-relaxed text-stone-800 sm:text-lg">
                    {cluster.famousRasail.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenChapter(cluster.linkedChapterId)}
                  className="inline-flex min-h-[46px] items-center gap-2 whitespace-nowrap text-lg font-bold text-[#14532D] transition-colors hover:text-[#0f3f22] hover:underline hover:underline-offset-4 sm:text-xl"
                >
                  <span>متعلقہ باب کا آسان اردو مطالعہ کریں</span>
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
