import { ArrowLeft, Trash2, X } from 'lucide-react';
import { Chapter, Masala } from '../types/fatawa';

interface SavedBookmarksModalProps {
  isOpen: boolean;
  chapters: Chapter[];
  savedIds: string[];
  onClose: () => void;
  onSelectItem: (chapterId: string, masalaId: string) => void;
  onRemoveItem: (masalaId: string) => void;
  onClearAll: () => void;
}

export function SavedBookmarksModal({
  isOpen,
  chapters,
  savedIds,
  onClose,
  onSelectItem,
  onRemoveItem,
  onClearAll,
}: SavedBookmarksModalProps) {
  if (!isOpen) return null;

  const savedItems: Array<{ chapter: Chapter; masala: Masala }> = [];
  for (const chapter of chapters) {
    for (const masala of chapter.masail) {
      if (savedIds.includes(masala.id)) {
        savedItems.push({ chapter, masala });
      }
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
    >
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-stone-300 bg-[#FBF9F5] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-[#F4F0E7] px-6 py-4">
          <div>
            <h2
              id="saved-modal-title"
              className="font-nastaliq text-2xl font-bold text-[#0F0D0B] sm:text-3xl"
            >
              محفوظ کردہ مسائل ({savedItems.length})
            </h2>
            <p className="text-base font-bold text-stone-600">
              بعد میں مطالعہ کرنے کے لیے آپ کے نشان زدہ شرعی مسائل
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بند کریں"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {savedItems.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-xl font-bold text-stone-800">
                ابھی تک کوئی مسئلہ محفوظ نہیں کیا گیا۔
              </p>
              <p className="mt-3 text-lg font-semibold text-stone-600">
                مطالعہ کے دوران کسی بھی مسئلے کے اوپر موجود "محفوظ کریں" بٹن پر
                کلک کر کے اسے یہاں محفوظ کر سکتے ہیں۔
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-stone-200">
              {savedItems.map(({ chapter, masala }) => (
                <li
                  key={masala.id}
                  className="flex flex-col justify-between gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold text-stone-600">
                      باب {chapter.numberUrdu}: {chapter.urduTitle} ·{' '}
                      {masala.ruling}
                    </div>
                    <div className="mt-1 text-xl font-bold text-[#0F0D0B]">
                      {masala.title}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectItem(chapter.id, masala.id);
                        onClose();
                      }}
                      className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-md bg-[#14532D] px-4 py-2 text-base font-bold text-[#FBF9F5] hover:bg-[#114224]"
                    >
                      <span>پڑھیں</span>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(masala.id)}
                      aria-label="فہرست سے ہٹائیں"
                      className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-md border border-stone-300 bg-white text-stone-600 hover:bg-stone-100 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {savedItems.length > 0 && (
          <div className="flex items-center justify-between border-t border-stone-200 bg-[#F4F0E7] px-6 py-3">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-medium text-red-700 hover:underline"
            >
              تمام محفوظ مسائل صاف کریں
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[38px] rounded-md border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-stone-50"
            >
              بند کریں
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
