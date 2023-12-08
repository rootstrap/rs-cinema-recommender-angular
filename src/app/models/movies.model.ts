import { User } from "./users.model";

export interface Movie {
    id?: string;
    title: string;
    thumbsUp: User[];
    thumbsDown: User[];
}
