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
    text: string,
    createdAt: Date,
    updatedAt: Date
}

export interface ConfessionType {
    _id: string;
    description?: string;
    isanonymous: boolean;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    like: number;
    dislike: number;
    comments: CommentType[];
    __v: number;
}
