import { useEffect, useMemo, useState } from 'react';
import {
  ALL_CHAPTERS,
  GLOSSARY_TERMS,
  VOLUME_CLUSTERS,
} from './data/fatawaData';
import { Header } from './components/Header';
import { HeroBroadsheet } from './components/HeroBroadsheet';
import { ChapterReaderWorkspace } from './components/ChapterReaderWorkspace';
import { VolumesMapSection } from './components/VolumesMapSection';
import { GlossarySection } from './components/GlossarySection';
import { SavedBookmarksModal } from './components/SavedBookmarksModal';
import { Footer } from './components/Footer';

const SAVED_STORAGE_KEY = 'fatawa_razawiya_saved_masail_v1';
const STUDIED_STORAGE_KEY = 'fatawa_razawiya_studied_chapters_v1';

function readStoredIds(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState<string>(
    ALL_CHAPTERS[0].id
  );
  const [activeMasalaId, setActiveMasalaId] = useState<string>(
    ALL_CHAPTERS[0].masail[0].id
  );
  const [savedMasalaIds, setSavedMasalaIds] = useState<string[]>(() =>
    readStoredIds(SAVED_STORAGE_KEY)
  );
  const [studiedChapterIds, setStudiedChapterIds] = useState<string[]>(() =>
    readStoredIds(STUDIED_STORAGE_KEY)
  );
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(savedMasalaIds)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [savedMasalaIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STUDIED_STORAGE_KEY,
        JSON.stringify(studiedChapterIds)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [studiedChapterIds]);

  const totalMasailCount = useMemo(
    () => ALL_CHAPTERS.reduce((acc, ch) => acc + ch.masail.length, 0),
    []
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectChapter = (chapterId: string, masalaId?: string) => {
    const targetChapter =
      ALL_CHAPTERS.find((c) => c.id === chapterId) ?? ALL_CHAPTERS[0];
    setActiveChapterId(targetChapter.id);
    if (
      masalaId &&
      targetChapter.masail.some((m) => m.id === masalaId)
    ) {
      setActiveMasalaId(masalaId);
    } else {
      setActiveMasalaId(targetChapter.masail[0].id);
    }
  };

  const handleOpenChapterFromVolumes = (chapterId: string) => {
    handleSelectChapter(chapterId);
    scrollToSection('chapters-workspace');
  };

  const handleToggleSaveMasala = (masalaId: string) => {
    setSavedMasalaIds((prev) =>
      prev.includes(masalaId)
        ? prev.filter((id) => id !== masalaId)
        : [...prev, masalaId]
    );
  };

  const handleToggleStudiedChapter = (chapterId: string) => {
    setStudiedChapterIds((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917]" dir="rtl">
      <Header
        savedCount={savedMasalaIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onJumpToSection={scrollToSection}
      />

      <HeroBroadsheet
        totalChapters={ALL_CHAPTERS.length}
        totalMasail={totalMasailCount}
        studiedCount={studiedChapterIds.length}
        onStartReading={() => scrollToSection('chapters-workspace')}
        onViewVolumes={() => scrollToSection('volumes-map')}
      />

      <ChapterReaderWorkspace
        chapters={ALL_CHAPTERS}
        activeChapterId={activeChapterId}
        activeMasalaId={activeMasalaId}
        savedMasalaIds={savedMasalaIds}
        studiedChapterIds={studiedChapterIds}
        onSelectChapter={handleSelectChapter}
        onSelectMasala={(id) => setActiveMasalaId(id)}
        onToggleSaveMasala={handleToggleSaveMasala}
        onToggleStudiedChapter={handleToggleStudiedChapter}
      />

      <VolumesMapSection
        clusters={VOLUME_CLUSTERS}
        onOpenChapter={handleOpenChapterFromVolumes}
      />

      <GlossarySection terms={GLOSSARY_TERMS} />

      <Footer onJumpToSection={scrollToSection} />

      <SavedBookmarksModal
        isOpen={isSavedModalOpen}
        chapters={ALL_CHAPTERS}
        savedIds={savedMasalaIds}
        onClose={() => setIsSavedModalOpen(false)}
        onSelectItem={(chapterId, masalaId) => {
          handleSelectChapter(chapterId, masalaId);
          scrollToSection('chapters-workspace');
        }}
        onRemoveItem={(masalaId) =>
          setSavedMasalaIds((prev) => prev.filter((id) => id !== masalaId))
        }
        onClearAll={() => setSavedMasalaIds([])}
      />
    </div>
  );
}
