export interface JournalType {
    _id: string,
    userId: string,
    description: string,
    createdAt: Date,
    updatedAt: Date   
}

export interface BlogType extends JournalType{
    title: string,
}

export type CommentType = {
    commenterId: string,
    username: string,
    userComment: string,
    createdAt: Date,
    updatedAt: Date
}

export interface ConfessionType {
    _id: string;
    userId: string;
    description: string;
    isanonymous: boolean;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    like: string[];
    dislike: string[];
    comments: CommentType[];
}
