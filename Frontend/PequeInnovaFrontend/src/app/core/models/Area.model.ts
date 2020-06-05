import {Course} from './Course.model';
import {Assignment} from './Assignment.model';
export interface Area{

     id: number;
     name: string;
     description: string;
     image: string;
     uid: string;
     state: boolean;
     status: boolean;
     updateDate: string;
     createDate: string;
     courses: Array<Course>;
     assignments: Array<Assignment>;
}