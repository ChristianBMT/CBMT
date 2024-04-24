export type Devotion = {
  audio_file?: string;
  author: string;
  author_about?: string;
  bible_verse?: string;
  content: string;
  docs?: string;
  id: string;
  prayer?: string;
  title: string;
  verse_id?: string;
  weekNo: number;
  image: string;
  image_source: string;
  tag?: Tag[];
  hide?: boolean;
};

export type Tag = { id: string; name: string };

export type DevotionAudioBody = {
  content: string;
  author: string;
  prayer?: string;
  title: string;
  verse_id?: string;
  bible_verse?: string;
};

export type DevotionExcel = {
  id: string;
  weekNo: number;
  title: string;
  author: string;
  author_about?: string;
  verse_id: string;
  content: string;
  prayer?: string;
  image: string;
  image_source: string;
  bible_verse?: string;
  audio_file?: string;
};
