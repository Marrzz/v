import type { ICourse } from "./ICourse";
import type { IProfessor } from "./IProfessor";

export interface IActiveCourse {
    language: string,
    id: string,
    course: ICourse
    professor: IProfessor

}