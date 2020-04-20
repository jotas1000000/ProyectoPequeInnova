import { Course } from './Course';

export class Area{
    Id:number;
    Name:string;
    Description:string;
    Image: string;
    Active:boolean;
    Erased:boolean;
    Courses:Course[];
}