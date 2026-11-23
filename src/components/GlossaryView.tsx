import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/fatawaCatalog';

interface GlossaryViewProps {
  onBackHome: () => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onBackHome }) => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-2 rounded-xl border border-[#1E2E54] bg-[#101A36] px-5 py-2.5 text-lg text-white transition-colors hover:border-[#38BDF8] hover:bg-[#16244A]"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>
      </div>

      <section className="rounded-2xl border border-[#1E2E54] bg-[#0F1834] px-5 py-8 text-center shadow-2xl shadow-black/30 sm:px-8">
        <h1 className="text-2xl leading-[1.9] text-white sm:text-3xl md:text-4xl">
          ضروری فقہی اصطلاحات اور ان کے آسان معنی
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-lg leading-[2.1] text-[#CBD5E1] sm:text-xl">
          فتاویٰ رضویہ کے مطالعے میں بار بار آنے والے شرعی الفاظ کی سادہ اور واضح تشریح
        </p>
      </section>

      <section className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {GLOSSARY_ITEMS.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[#1E2E54] bg-[#0F1834] p-6 shadow-lg"
          >
            <h2 className="border-b border-[#1E2E54] pb-2.5 text-xl text-[#38BDF8] sm:text-2xl">
              {item.term}
            </h2>
            <p className="mt-3 text-lg leading-[2.2] text-white sm:text-xl">
              {item.meaning}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
};
