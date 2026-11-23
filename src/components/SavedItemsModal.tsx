import React from 'react';
import { Bookmark, Trash2, X } from 'lucide-react';
import { Bab, Jild } from '../types/fatawa';

interface SavedItem {
  jild: Jild;
  bab: Bab;
}

interface SavedItemsModalProps {
  isOpen: boolean;
  items: SavedItem[];
  onClose: () => void;
  onSelectBab: (jildId: string, babId: string) => void;
  onRemoveBookmark: (babId: string) => void;
}

export const SavedItemsModal: React.FC<SavedItemsModalProps> = ({
  isOpen,
  items,
  onClose,
  onSelectBab,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
    >
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl border border-[#1E2E54] bg-[#0F1834] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1E2E54] px-6 py-4">
          <div className="flex items-center gap-3">
            <Bookmark className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
            <h2 id="saved-modal-title" className="text-xl text-white sm:text-2xl">
              محفوظ کردہ ابواب و مسائل ({items.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بند کریں"
            className="rounded-xl border border-[#1E2E54] bg-[#101A36] p-2 text-[#CBD5E1] hover:border-[#38BDF8] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-xl text-[#CBD5E1] leading-[2]">
                ابھی تک کوئی باب محفوظ نہیں کیا گیا۔ کسی بھی باب کو کھول کر "محفوظ کریں" بٹن دبائیں۔
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {items.map(({ jild, bab }) => (
                <div
                  key={bab.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-[#1E2E54] bg-[#101A36] p-4 transition-colors hover:border-[#38BDF8]/60"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectBab(jild.id, bab.id);
                      onClose();
                    }}
                    className="flex-1 text-right"
                  >
                    <p className="text-base text-[#38BDF8]">
                      جلد نمبر {jild.jildNumber} • باب {bab.babNumber} • صفحہ {bab.pageNumber}
                    </p>
                    <h3 className="mt-1 text-xl text-white leading-[1.9]">
                      {bab.title}
                    </h3>
                    <p className="mt-1 text-base text-[#CBD5E1] leading-[2]">
                      {bab.shortSummary}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(bab.id)}
                    aria-label="فہرست سے ہٹائیں"
                    className="rounded-lg border border-[#1E2E54] p-2 text-[#94A3B8] hover:border-rose-400/50 hover:text-rose-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-[#1E2E54] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#059669] px-5 py-2 text-lg text-white hover:bg-[#10B981]"
          >
            واپس جائیں
          </button>
        </div>
      </div>
    </div>
  );
};
