export type Metadata = {
  title: string;
  publishedAt: string;
  isDraft: boolean;
  isTechnical?: boolean;
  summary: string;
  tags: string;
  image?: string;
};

export type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
  tags: string[];
};
