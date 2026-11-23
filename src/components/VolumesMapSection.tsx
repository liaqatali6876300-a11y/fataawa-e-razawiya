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
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        {/* Section Header + Archival Shelf Visual */}
        <div className="grid grid-cols-1 items-stretch gap-8 border-b border-stone-300/70 pb-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-medium text-stone-500">
              جدید تخریج شدہ ایڈیشن · مکمل ۳۰ مجلدات
            </p>
            <h2 className="font-nastaliq mt-1.5 text-2xl font-bold text-[#1C1917] sm:text-3xl">
              فتاویٰ رضویہ کی ۳۰ جلدوں کا اجمالی نقشہ
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.95] text-stone-700">
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
              className="flex flex-col justify-between rounded-md border border-stone-200/90 bg-[#FBF9F5] p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3 text-xs font-semibold">
                  <span className="tabular-nums text-[#78350F]">
                    {cluster.volumesUrdu}
                  </span>
                  <span className="text-stone-500">{cluster.arabicScope}</span>
                </div>

                <h3 className="font-nastaliq mt-3 text-xl font-bold text-[#1C1917]">
                  {cluster.title}
                </h3>

                <p className="mt-2.5 text-sm leading-[1.9] text-stone-700">
                  {cluster.description}
                </p>

                <div className="mt-4 border-t border-stone-200/70 pt-3">
                  <div className="text-xs font-semibold text-stone-500">
                    نمایاں رسائل:
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">
                    {cluster.famousRasail.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenChapter(cluster.linkedChapterId)}
                  className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#14532D] transition-colors hover:text-[#0f3f22] hover:underline hover:underline-offset-4"
                >
                  <span>متعلقہ باب کا آسان اردو مطالعہ کریں</span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
