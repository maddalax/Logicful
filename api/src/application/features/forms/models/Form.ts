import { Field } from "./Field";
import { User } from "../../user/models/User";

export interface FormSubmission {
    id : string,
    submission : {[key : string] : any}
    userId : string,
    timestamp : number
}

export interface FormSubmissionHash {
    id : string
    timestamp : number
}

export interface Form {
    id : string
    timestamp : number,
    submissions : FormSubmissionHash[]
    createdBy : string,
    lastModifiedBy : string,
    lastModified : number,
    fields : Field[]
}

export interface FormHash {
    id : string,
    timestamp : number
}

export interface UserHash {
    email : string
}

export interface Client {
    id : string,
    forms : FormHash[],
    users: UserHash[],
    name : string,
    label? : string,
    created : number,
    createdBy : string
}