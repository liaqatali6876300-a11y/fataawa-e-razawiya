import { CHAPTERS_PART_1 } from './chaptersPart1';
import { CHAPTERS_PART_2 } from './chaptersPart2';
import { GLOSSARY_TERMS, VOLUME_CLUSTERS } from './glossaryAndVolumes';
import { Chapter } from '../types/fatawa';

export const ALL_CHAPTERS: Chapter[] = [...CHAPTERS_PART_1, ...CHAPTERS_PART_2];

export { GLOSSARY_TERMS, VOLUME_CLUSTERS };
