import { Course } from './Course';

export class Area{
    id:number;
    name:string;
    description:string;
    image: string;
    active:boolean;
    erased:boolean;
    courses:Course[];
}