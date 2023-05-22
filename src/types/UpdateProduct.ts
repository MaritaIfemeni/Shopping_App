export interface UpdateProduct {
  id: number;
  data: {
    title?: string;
    price?: number;
    description?: string;
    images?: string[];
  };
}
