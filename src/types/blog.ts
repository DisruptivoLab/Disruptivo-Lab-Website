export interface BlogPost {
  id: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  canonical_url?: string;
  reading_time?: number;
  cover_image: string;
  cover_image_alt: string;
  cover_image_width?: number;
  cover_image_height?: number;
  author_name: string;
  author_image?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  views_count: number;
  generated_by_ai: boolean;
  ai_model?: string;
  generation_prompt?: string;
}

export interface BlogPostTranslation {
  id: string;
  post_id: string;
  locale: 'es' | 'en';
  title: string;
  excerpt: string;
  content: string;
  content_format: 'html' | 'markdown';
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema_type: string;
  schema_json?: Record<string, unknown>;
  llm_summary?: string;
  llm_key_points?: string[];
  llm_entities?: {
    personas?: string[];
    organizaciones?: string[];
    tecnologias?: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  slug: string;
  icon?: string;
  color?: string;
  created_at: string;
}

export interface BlogCategoryTranslation {
  id: string;
  category_id: string;
  locale: 'es' | 'en';
  name: string;
  description?: string;
}

export interface BlogTag {
  id: string;
  slug: string;
  created_at: string;
}

export interface BlogTagTranslation {
  id: string;
  tag_id: string;
  locale: 'es' | 'en';
  name: string;
}

export interface BlogPostWithTranslation extends BlogPost {
  translation: BlogPostTranslation;
  categories?: (BlogCategory & { translation: BlogCategoryTranslation })[];
  tags?: (BlogTag & { translation: BlogTagTranslation })[];
}
