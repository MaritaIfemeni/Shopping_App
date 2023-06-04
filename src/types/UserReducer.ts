import { AdminUser } from "./AdminUser";
import { User } from "./User";

export interface UserReducer {
  users: User[];
  currentUser?: User | AdminUser | null;
  userResponse: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  loading: boolean;
  error: string;
}
