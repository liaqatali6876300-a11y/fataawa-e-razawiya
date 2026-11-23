export type JildCategory =
  | 'طہارت و نماز'
  | 'زکوٰۃ، روزہ و حج'
  | 'نکاح و طلاق'
  | 'عقائد و ایمانیات'
  | 'تجارت و معاملات'
  | 'آداب، میراث و علوم';

export interface Bab {
  id: string;
  babNumber: number;
  title: string;
  pageNumber: number;
  shortSummary: string;
  maslaDetail: string;
  daleelDetail: string;
  easyExplanation: string[];
  referenceNote: string;
}

export interface Jild {
  id: string;
  jildNumber: number;
  title: string;
  category: JildCategory;
  shortIntro: string;
  abwab: Bab[];
}
