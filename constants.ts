import { StoryGenre } from './types';

export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const AVAILABLE_GENRES: StoryGenre[] = [
  StoryGenre.FANTASY,
  StoryGenre.SCI_FI,
  StoryGenre.MYSTERY,
  StoryGenre.COMEDY,
  StoryGenre.HORROR,
  StoryGenre.ADVENTURE,
];

export const DEFAULT_GENRE = StoryGenre.FANTASY;
