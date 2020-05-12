import {Question} from './Question.model';
export interface LessonN{

    id: number;
    title: string;
    document: string;
    urlVideo: string;
    description: string;
    type: string;
    order: number;
    uid: string;
    state: boolean;
    status: boolean;
    updateDate: string;
    createDate: string;
    courseId: number;
    comments: Array<any>;
    questions: Array<Question>;
}
