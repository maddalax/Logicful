import type { Group } from './Group';
import type { IField, LabelValue } from './IField';

export type IForm = {
    fields : IField[],
    title? : string,
    description? : string,
    enableLogic? : boolean
    id? : string,
    lastUpdated? : string,
    groups? : Group[],
    disableSubmissions? : Boolean,
    maxSubmissions? : number,
    openDateTime?: string,
    closeDateTime?: string
}