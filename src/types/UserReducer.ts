import { AdminUser } from "./AdminUser";  
import { User } from "./User";

export interface UserReducer {
    users: User[];
    currentUser?: User | AdminUser | null;
    loading: boolean;
    error: string;
  }