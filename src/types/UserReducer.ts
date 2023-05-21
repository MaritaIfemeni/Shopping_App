import { User } from "./User";

export interface UserReducer {
    users: User[];
    currentUser?: User;
    loading: boolean;
    error: string;
  }