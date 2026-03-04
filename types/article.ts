import { Category } from "./category";

export type Article = {
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