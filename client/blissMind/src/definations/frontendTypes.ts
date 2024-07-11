import type{ Dispatch, MutableRefObject, SetStateAction } from "react";
import type{ ConfessionType } from "./backendTypes";

export type signUpType = {
  email: string,
  password: string,
  fullName: string,
  gender: string,
  age: string,
  type: string
}

export interface AuthContextProps {
  user: UserType;
  login: (email: string, password: string) => Promise<void>;
  signUp: (formData: signUpType) => Promise<void>;
  logout: () => Promise<void>;
}

export interface UserType {
    userId: string;
    fullName: string;
    email: string;
    type: "student" | "professional";
    description: string;
  }
 
  // props and others
  export type NumOfReactionType = {
    like: number,
    dislike: number,
    comment: number
}

export enum Reaction { NONE, LIKE, DISLIKE }

 export type reactionRefType = {
    defaultLike: number,
    defaultDislike: number,
    userReaction: number,
    numOfReaction: {
        like: number,
        dislike: number
    }
};

  export interface ConfessionCardFrameProps {
    confession: ConfessionType,
    numOfReaction: NumOfReactionType,
    setNumOfReaction: Dispatch<SetStateAction<NumOfReactionType>>,
    setOpenPost: Dispatch<SetStateAction<boolean>>,
    sideEffectOnUnmount: boolean,
    reaction: Reaction,
    setReaction: Dispatch<SetStateAction<Reaction>>
    reactionRef: MutableRefObject<reactionRefType>
}