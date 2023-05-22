import { User } from "./User";

export interface UserReducer {
    users: User[];
    currentUser?: User | null;
    loading: boolean;
    error: string;
  }