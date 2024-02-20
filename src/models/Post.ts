import { StatType } from "../services/db";

export interface Post {
    id: string;
    createdAt: number;
    image: string;
    text?: string;
    tags?: string[];
    userId: string;
    userName: string;
    dimension: {height: number; width: number};
}

export interface Comment {
    userId: string;
    userName: string;
    text: string;
    id: string;
    createdAt: number;
    postId: string;
    replies?: {[key: string]: Comment};
}

export interface Stats {
    [StatType.Comment]?: number;
    [StatType.Download]?: number;
    [StatType.Views]?: number;
    [StatType.Likes]?: number;
}