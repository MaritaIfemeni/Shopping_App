export interface UpdatedProduct {
  id: number;
  data: {
    title?: string;
    price?: number;
    description?: string;
    images?: string[];
  };
}
