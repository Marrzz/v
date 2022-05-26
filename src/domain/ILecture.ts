import type { IActiveCourse } from "./IActiveCourse"
import type { IUniversity } from "./IUniversity"
import type { ILectureData } from "./ILectureData"

export interface ILecture{

    happened: Date
    university: IUniversity
    coursewithaprofessor: IActiveCourse
    lecture: ILectureData

}