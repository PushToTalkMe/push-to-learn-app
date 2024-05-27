export interface Course {
  _id: string;
  title: string;
  img: string;
  author: string;
  duration: string;
  tags?: string[] | null;
  price: number;
  rating: number;
  index: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
