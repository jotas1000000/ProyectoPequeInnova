import {Comment } from './Comment';

export class Lesson{
    id:number;
    title:string;
    document:string;
    urlVideo:string;
    description: string;
    type: string;
    order:number;
    courseId: number;
    comments:Comment[];
}