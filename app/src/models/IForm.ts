import type { IField } from './IField';

export type IForm = {
    fields : IField[],
    title? : string,
    enableLogic? : boolean
    id? : string
}