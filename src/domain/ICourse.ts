import type { IUniversity } from "./IUniversity"

export interface ICourse {
    name: string, 
    code: string, 
    universityId: string
    instituteId: string
    id: string
    university: IUniversity

}