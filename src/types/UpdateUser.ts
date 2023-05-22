export interface UpdateUser {
  id: number;
  data: {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
  };
}
