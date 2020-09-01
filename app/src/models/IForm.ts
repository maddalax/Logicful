import type { Group } from './Group';
import type { IField, LabelValue } from './IField';

export type IForm = {
    fields : IField[],
    title? : string,
    enableLogic? : boolean
    id? : string,
    lastUpdated? : string,
    groups? : Group[]
}