import { useState } from 'react';
import { GlossaryCategory, GlossaryTerm } from '../types/fatawa';

interface GlossarySectionProps {
  terms: GlossaryTerm[];
}

const CATEGORIES: Array<'سب' | GlossaryCategory> = [
  'سب',
  'احکامِ شرعیہ',
  'طہارت و عبادات',
  'معاملات و عائلی قوانین',
];

export function GlossarySection({ terms }: GlossarySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'سب' | GlossaryCategory>(
    'سب'
  );

  const filteredTerms =
    selectedCategory === 'سب'
      ? terms
      : terms.filter((t) => t.category === selectedCategory);

  return (
    <section
      id="glossary-section"
      className="border-b border-stone-200 bg-[#FBF9F5] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-5 border-b border-stone-200 pb-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium text-stone-500">
              آسان فقہی لغت · عام فہم تشریح
            </p>
            <h2 className="font-nastaliq mt-1 text-2xl font-bold text-[#1C1917] sm:text-3xl">
              فقہ و فتاویٰ کی بنیادی اصطلاحات کا آسان تعارف
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-[1.9] text-stone-600">
              عربی فقہی الفاظ کو روزمرہ مثالوں کی مدد سے سمجھیں تاکہ فتاویٰ
              پڑھتے وقت کوئی الجھن باقی نہ رہے۔
            </p>
          </div>

          {/* Interactive Category Filter Control */}
          <div
            role="group"
            aria-label="لغت کی قسم منتخب کریں"
            className="flex flex-wrap items-center gap-1 rounded-md border border-stone-200 bg-[#F2EDE3] p-1"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[38px] whitespace-nowrap rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#FBF9F5] text-[#14532D] shadow-xs'
                    : 'text-stone-600 hover:text-[#1C1917]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Unboxed Term Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTerms.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-md border border-stone-200 bg-white p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                  <span>{item.category}</span>
                  {item.arabicOrRoot && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{item.arabicOrRoot}</span>
                    </>
                  )}
                </div>

                <h3 className="font-nastaliq mt-2 text-lg font-bold text-[#1C1917]">
                  {item.term}
                </h3>

                <p className="mt-2.5 text-sm leading-[1.9] text-stone-700">
                  {item.easyDefinition}
                </p>
              </div>

              <div className="mt-4 border-t border-stone-200/80 pt-3">
                <div className="text-xs font-semibold text-[#14532D]">
                  آسان مثال:
                </div>
                <p className="mt-1 text-xs leading-[1.85] text-stone-600">
                  {item.everydayExample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
