export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  category: 'seo' | 'youtube' | 'website';
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}
