export type RulingLevel =
  | 'فرضِ عین'
  | 'واجب'
  | 'سنتِ مؤکدہ'
  | 'مستحب و مسنون'
  | 'مباح و جائز'
  | 'مکروہ و ممنوع'
  | 'حرام و ناجائز'
  | 'فقہی و علمی اصول';

export interface Masala {
  id: string;
  numberUrdu: string;
  title: string;
  ruling: RulingLevel;
  question: string;
  easyExplanation: string[];
  principlesAndProofs: string;
  practicalTakeaway: string;
  reference: string;
  keywords: string[];
}

export interface ChapterMarginNote {
  term: string;
  meaning: string;
}

export interface Chapter {
  id: string;
  numberUrdu: string;
  arabicTitle: string;
  urduTitle: string;
  volumeSpan: string;
  summary: string;
  introduction: string;
  keyTreatises: string[];
  marginNotes: ChapterMarginNote[];
  masail: Masala[];
  relatedChapterIds: string[];
  romanKeywords: string[];
}

export interface VolumeCluster {
  id: string;
  volumesUrdu: string;
  title: string;
  arabicScope: string;
  description: string;
  famousRasail: string[];
  linkedChapterId: string;
}

export type GlossaryCategory =
  | 'احکامِ شرعیہ'
  | 'طہارت و عبادات'
  | 'معاملات و عائلی قوانین';

export interface GlossaryTerm {
  id: string;
  term: string;
  arabicOrRoot?: string;
  category: GlossaryCategory;
  easyDefinition: string;
  everydayExample: string;
}
