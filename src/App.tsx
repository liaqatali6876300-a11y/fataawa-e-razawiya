import { useEffect, useMemo, useState } from 'react';
import { ALL_JILDS } from './data/fatawaCatalog';
import { Bab, Jild, JildCategory } from './types/fatawa';
import { Navbar } from './components/Navbar';
import { HomeJildList } from './components/HomeJildList';
import { JildAbwabPage } from './components/JildAbwabPage';
import { BabDetailPage } from './components/BabDetailPage';
import { GlossaryView } from './components/GlossaryView';
import { SavedItemsModal } from './components/SavedItemsModal';

type AppPage = 'home' | 'jild' | 'bab' | 'glossary';

const STUDIED_STORAGE_KEY = 'fatawa_razawiya_studied_v2';
const BOOKMARKS_STORAGE_KEY = 'fatawa_razawiya_bookmarks_v2';

function readStoredIds(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === 'string')
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [page, setPage] = useState<AppPage>('home');
  const [selectedJildId, setSelectedJildId] = useState<string>(ALL_JILDS[0].id);
  const [selectedBabId, setSelectedBabId] = useState<string>(
    ALL_JILDS[0].abwab[0].id
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<
    JildCategory | 'all'
  >('all');
  const [isSavedOpen, setIsSavedOpen] = useState<boolean>(false);

  const [studiedBabIds, setStudiedBabIds] = useState<string[]>(() =>
    readStoredIds(STUDIED_STORAGE_KEY)
  );
  const [bookmarkedBabIds, setBookmarkedBabIds] = useState<string[]>(() =>
    readStoredIds(BOOKMARKS_STORAGE_KEY)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STUDIED_STORAGE_KEY,
        JSON.stringify(studiedBabIds)
      );
    } catch {
      // Ignore storage errors
    }
  }, [studiedBabIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        BOOKMARKS_STORAGE_KEY,
        JSON.stringify(bookmarkedBabIds)
      );
    } catch {
      // Ignore storage errors
    }
  }, [bookmarkedBabIds]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, selectedJildId, selectedBabId]);

  const currentJildIndex = useMemo(
    () => ALL_JILDS.findIndex((j) => j.id === selectedJildId),
    [selectedJildId]
  );

  const currentJild: Jild =
    currentJildIndex >= 0 ? ALL_JILDS[currentJildIndex] : ALL_JILDS[0];

  const currentBabIndex = useMemo(
    () => currentJild.abwab.findIndex((b) => b.id === selectedBabId),
    [currentJild, selectedBabId]
  );

  const currentBab: Bab =
    currentBabIndex >= 0
      ? currentJild.abwab[currentBabIndex]
      : currentJild.abwab[0];

  const savedItems = useMemo(() => {
    const bookmarkSet = new Set(bookmarkedBabIds);
    const items: { jild: Jild; bab: Bab }[] = [];
    for (const jild of ALL_JILDS) {
      for (const bab of jild.abwab) {
        if (bookmarkSet.has(bab.id)) {
          items.push({ jild, bab });
        }
      }
    }
    return items;
  }, [bookmarkedBabIds]);

  const handleOpenJild = (jildId: string) => {
    setSelectedJildId(jildId);
    setPage('jild');
  };

  const handleOpenBab = (jildId: string, babId: string) => {
    setSelectedJildId(jildId);
    setSelectedBabId(babId);
    setPage('bab');
  };

  const handleToggleStudied = (babId: string) => {
    setStudiedBabIds((prev) =>
      prev.includes(babId)
        ? prev.filter((id) => id !== babId)
        : [...prev, babId]
    );
  };

  const handleToggleBookmark = (babId: string) => {
    setBookmarkedBabIds((prev) =>
      prev.includes(babId)
        ? prev.filter((id) => id !== babId)
        : [...prev, babId]
    );
  };

  return (
    <div className="flex min-h-screen flex-col text-white">
      <Navbar
        activeTab={page === 'glossary' ? 'glossary' : 'home'}
        onGoHome={() => setPage('home')}
        onGoGlossary={() => setPage('glossary')}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedItems.length}
      />

      <div className="flex-1">
        {page === 'home' && (
          <HomeJildList
            jilds={ALL_JILDS}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            studiedBabIds={studiedBabIds}
            onSelectJild={handleOpenJild}
            onSelectBab={handleOpenBab}
          />
        )}

        {page === 'jild' && (
          <JildAbwabPage
            jild={currentJild}
            studiedBabIds={studiedBabIds}
            hasPrevJild={currentJildIndex > 0}
            hasNextJild={currentJildIndex < ALL_JILDS.length - 1}
            onBackHome={() => setPage('home')}
            onSelectBab={(babId) => handleOpenBab(currentJild.id, babId)}
            onGoPrevJild={() => {
              if (currentJildIndex > 0) {
                setSelectedJildId(ALL_JILDS[currentJildIndex - 1].id);
              }
            }}
            onGoNextJild={() => {
              if (currentJildIndex < ALL_JILDS.length - 1) {
                setSelectedJildId(ALL_JILDS[currentJildIndex + 1].id);
              }
            }}
          />
        )}

        {page === 'bab' && (
          <BabDetailPage
            jild={currentJild}
            bab={currentBab}
            isBookmarked={bookmarkedBabIds.includes(currentBab.id)}
            isStudied={studiedBabIds.includes(currentBab.id)}
            hasPrevBab={currentBabIndex > 0}
            hasNextBab={currentBabIndex < currentJild.abwab.length - 1}
            onBackToJild={() => setPage('jild')}
            onToggleBookmark={() => handleToggleBookmark(currentBab.id)}
            onToggleStudied={() => handleToggleStudied(currentBab.id)}
            onGoPrevBab={() => {
              if (currentBabIndex > 0) {
                setSelectedBabId(currentJild.abwab[currentBabIndex - 1].id);
              }
            }}
            onGoNextBab={() => {
              if (currentBabIndex < currentJild.abwab.length - 1) {
                setSelectedBabId(currentJild.abwab[currentBabIndex + 1].id);
              }
            }}
          />
        )}

        {page === 'glossary' && (
          <GlossaryView onBackHome={() => setPage('home')} />
        )}
      </div>

      <footer className="mt-12 border-t border-[#1E2E54] bg-[#081023] py-6 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-base text-[#CBD5E1] sm:text-lg leading-[2]">
            فتاویٰ رضویہ — مکمل ۳۰ جلدیں آسان اردو زبان اور مستند دلائل کے ساتھ
          </p>
        </div>
      </footer>

      <SavedItemsModal
        isOpen={isSavedOpen}
        items={savedItems}
        onClose={() => setIsSavedOpen(false)}
        onSelectBab={handleOpenBab}
        onRemoveBookmark={handleToggleBookmark}
      />
    </div>
  );
}
