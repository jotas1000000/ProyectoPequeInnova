import {LessonN} from './LessonN.model';
export interface Course{

    id: number;
    name: string;
    description: string;
    image: string;
    uid: string;
    state: boolean;
    status: boolean;
    updateDate: string;
    createDate: string;
    areaId: number;
    inscriptions: Array<any>;
    teachings: Array<any>;
    lessons: Array<LessonN>;
}