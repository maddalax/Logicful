import type { Group } from './Group';
import type { IField } from './IField';

export type IForm = {
    fields : IField[],
    title? : string,
    description? : string,
    enableLogic? : boolean
    id? : string,
    changeTime? : string,
    changeBy? : string
    groups? : Group[],
    disableSubmissions? : Boolean,
    maxSubmissions? : number,
    openDateTime?: string,
    closeDateTime?: string,
    emailOnSubmission? : Boolean
    url? : string
}
