import { Category } from "./category";


export type CategoryCount = {
  category: string;
  slug: string;
  count: number;
};

export type SubjectHeadingCount = {
  subject_heading: string;
  subject_heading_slug: string;
  total: number;
};


export type ApiResponseWithMeta = {
  data: {
    current_page: number;
    data: Material[];
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  meta: {
    category_counts: CategoryCount[];
    subject_heading_counts: SubjectHeadingCount[];
  };
};


export type Material = {
  id: number;
  title: string;
  slug: string;
  description: string;
  description_text: string;
  author: string;
  publish_date: string;
  is_press_release: boolean;
  category_id?: number;
  category?: Category 
};
