interface FooterProps {
  onJumpToSection: (sectionId: string) => void;
}

export function Footer({ onJumpToSection }: FooterProps) {
  return (
    <footer className="bg-[#F2EDE3] py-10 text-stone-700">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 border-b border-stone-300/80 pb-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="font-nastaliq text-2xl font-bold text-[#0F0D0B] sm:text-3xl">
              موسوعہ فتاویٰ رضویہ — آسان اردو تشریح
            </div>
            <p className="mt-3 max-w-xl text-lg font-bold leading-[1.95] text-[#1C1917] sm:text-xl">
              یہ مطالعاتی اشاعت مجددِ دین و ملت امام احمد رضا خان قادری رحمۃ اللہ
              علیہ کے ۳۰ جلدی فقہی انسائیکلوپیڈیا "العطایا النبویہ فی الفتاویٰ
              الرضویہ" کے بنیادی ابواب کا عام فہم خلاصہ پیش کرتی ہے۔
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-base font-bold text-stone-700">فوری روابط</div>
            <ul className="mt-3 space-y-2.5 text-lg font-bold">
              <li>
                <button
                  type="button"
                  onClick={() => onJumpToSection('top')}
                  className="hover:text-[#14532D] hover:underline"
                >
                  تعارف و خلاصہ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onJumpToSection('chapters-workspace')}
                  className="hover:text-[#14532D] hover:underline"
                >
                  ابوابِ فقہ (باب در باب)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onJumpToSection('volumes-map')}
                  className="hover:text-[#14532D] hover:underline"
                >
                  ۳۰ جلدوں کا نقشہ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onJumpToSection('glossary-section')}
                  className="hover:text-[#14532D] hover:underline"
                >
                  آسان فقہی لغت
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-base font-bold text-stone-700">شرعی احتیاط</div>
            <p className="mt-3 text-base font-bold leading-[1.95] text-[#1C1917] sm:text-lg">
              بنیادی مسائل کے فہم کے لیے یہ رہنمائی مرتب کی گئی ہے؛ البتہ پیچیدہ
              ذاتی یا قانونی معاملات (مثلاً طلاق، خلع، وراثت کے تنازعات) میں
              مقامی مستند دارالافتاء یا مفتی صاحب سے ضرور رجوع فرمائیں۔
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-base font-bold text-stone-700">
          <span>
            ماخذ: العطایا النبویہ فی الفتاویٰ الرضویہ (تخریج شدہ ۳۰ جلدی ایڈیشن)
          </span>
          <span>مرتب برائے آسان اردو فہم و مطالعہ</span>
        </div>
      </div>
    </footer>
  );
}
