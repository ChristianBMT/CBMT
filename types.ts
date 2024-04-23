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
